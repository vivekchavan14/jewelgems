import axios from "axios";

// Cashfree API credentials from environment variables
const secret_key = process.env.CASHFREE_SECRET_KEY;  // Corrected env variable name
const app_id = process.env.CASHFREE_APP_ID;          // Corrected env variable name

// Generate Payment Session Dynamically
export const createPaymentSession = async (req, res) => {
  try {
    const { customer_email, customer_phone, customer_name, order_amount } = req.body;

    // Validation
    if (!customer_email || !customer_phone || !customer_name || !order_amount) {
      return res.status(400).json({
        message: 'Missing required fields: customer_email, customer_phone, customer_name, or order_amount',
        success: false,
      });
    }

    // Generate dynamic orderId and customerId
    const orderId = `ORID${Date.now()}`;
    const customerId = `CID${Date.now()}`;

    // Prepare the return URL dynamically
    const returnUrl = process.env.NODE_ENV === 'production' 
      ? `https://your-production-url.com/api/cashfree/status/${orderId}` // For production
      : `http://localhost:8000/api/cashfree/status/${orderId}`;  // For development

    const options = {
      method: 'POST',
      url: 'https://api.cashfree.com/pg/orders',
      headers: {
        accept: 'application/json',
        'x-api-version': '2022-09-01',
        'content-type': 'application/json',
        'x-client-id': app_id,
        'x-client-secret': secret_key,
      },
      data: {
        order_id: orderId,
        order_currency: 'INR',
        order_amount: order_amount,
        customer_details: {
          customer_id: customerId,
          customer_email,
          customer_phone,
          customer_name,
        },
        order_meta: {
          return_url: returnUrl, // Inject dynamic return URL
          notify_url: process.env.NOTIFY_URL || 'https://your-server-url/notify', // Add your notify URL here
        },
        order_note: 'Order payment for dynamic integration',
      },
    };

    const response = await axios.request(options);

    if (response.data.payment_session_id) {
      return res.status(200).json({
        paymentSessionId: response.data.payment_session_id,
        orderId,
        success: true,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to generate payment session.',
        success: false,
      });
    }
  } catch (error) {
    console.error('Error generating session:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Internal server error during payment session creation.',
      success: false,
      error: error.response?.data || error.message,  // Added detailed error response for debugging
    });
  }
};

// Check Payment Status Dynamically
export const checkPaymentStatus = async (req, res) => {
  const { orderid } = req.params;

  try {
    if (!orderid) {
      return res.status(400).json({
        message: 'Order ID is required.',
        success: false,
      });
    }

    const options = {
      method: 'GET',
      url: `https://api.cashfree.com/pg/orders/${orderid}`,
      headers: {
        accept: 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': app_id,
        'x-client-secret': secret_key,
      },
    };

    const response = await axios.request(options);
    const { order_status } = response.data;

    // Dynamically redirect based on order status
    if (order_status === 'PAID') {
      return res.redirect(`http://localhost:8000/success?orderId=${orderid}`);
    } else if (order_status === 'ACTIVE') {
      return res.redirect(`http://localhost:8000/active?orderId=${orderid}`);
    } else if (order_status === 'FAILED' || order_status === 'CANCELLED') {
      return res.redirect(`http://localhost:8000/failure?orderId=${orderid}`);
    } else {
      return res.status(400).json({
        message: `Unhandled order status: ${order_status}`,
        success: false,
      });
    }
  } catch (error) {
    console.error('Error checking payment status:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Error checking payment status.',
      success: false,
      error: error.response?.data || error.message, // Added detailed error response for debugging
    });
  }
};
