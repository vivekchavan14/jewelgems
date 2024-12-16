import React from "react";
import image2 from "./../assets/logo.svg";

const Footer = () => {
  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 gap-5">
        {/* Footer Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-10 border-b border-gray-700 pb-10">
          {/* Left Footer */}
          <div className="flex flex-col mb-8 lg:mb-0 lg:w-1/3">
            <div className="flex items-center mb-4">
              <img src={image2} alt="JewelGems Logo" className="h-10 mr-3" />
              <p className="text-xl font-bold text-pink-500">JewelGems</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400">Subscribe to Our Newsletter</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 w-3/4 rounded-l-md bg-black text-white border border-gray-700 focus:outline-none"
                />
                <button className="p-2 w-1/3 bg-pink-500 rounded-r-md text-white hover:bg-pink-600 transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4 text-xl mt-4">
              <a
                href="/"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
                aria-label="Behance"
              >
                <i className="fab fa-behance"></i>
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Right Footer (Navigation, Legal, and Contact) */}
          <div className="lg:w-2/3 flex flex-col lg:flex-row justify-end">
            {/* Navigation */}
           

            {/* Legal */}
            <div className="mb-8 lg:mb-0 lg:w-1/3">
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul>
                <li>
                  <a
                    href="/"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:w-1/3">
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul>
                <li>
                  <a
                    href="tel:+123456789"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    <i className="fas fa-phone-alt mr-2"></i> +(123) 456-789
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@jewelgems.com"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    <i className="far fa-envelope mr-2"></i> support@jewelgems.com
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-gray-400 hover:text-pink-500 mb-2 transition duration-300"
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i> Location Address
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-gray-400">
          <p>© 2024 JewelGems. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
