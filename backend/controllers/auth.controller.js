import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate access and refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Store the refresh token in Redis
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

// Set cookies for access and refresh tokens
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
	const { email, password, name, phone } = req.body;
	try {
	  // Check if the email or phone already exists in the database
	  const userExistsByEmail = await User.findOne({ email });
	  const userExistsByPhone = await User.findOne({ phone });
  
	  if (userExistsByEmail) {
		return res.status(400).json({ message: "User with this email already exists" });
	  }
  
	  if (userExistsByPhone) {
		return res.status(400).json({ message: "User with this phone number already exists" });
	  }
  
	  // Create new user if no duplicate email or phone exists
	  const user = await User.create({ name, email, password, phone });
  
	  // Authenticate and generate tokens
	  const { accessToken, refreshToken } = generateTokens(user._id);
	  await storeRefreshToken(user._id, refreshToken);
  
	  // Set cookies for the tokens
	  setCookies(res, accessToken, refreshToken);
  
	  // Send response with user details including phone number
	  res.status(201).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		phone: user.phone,  // Include phone number in the response
		role: user.role,
	  });
	} catch (error) {
	  console.log("Error in signup controller", error.message);
	  res.status(500).json({ message: error.message });
	}
  };
  

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,  // Include phone number in the response
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Refresh token controller
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get profile controller
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);  // Assuming the user is attached to the request object
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
