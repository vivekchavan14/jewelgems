import axios from 'axios';
import { secret_key, app_id } from '../../frontend/src/utils/secret.js'; // Ensure this path is correct!

export const newOrderId = async (req, res) => {
    try {
      const { customer_email, customer_phone, customer_name, order_amount } = req.body;
  
      // Validate required fields
      if (!customer_email || !customer_phone || !customer_name || !order_amount) {
        return res.status(400).json({
          message: 'Missing required fields: customer_email, customer_phone, customer_name, or order_amount',
          success: false,
        });
      }
  
      // Generate unique IDs for order and customer
      const orderId = `ORID${Date.now()}`;
      const customerId = `CID${Date.now()}`;
  
      // Request options to Cashfree API
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
          customer_details: {
            customer_id: customerId,
            customer_email,
            customer_phone,
            customer_name,
          },
          order_meta: {
            notify_url: 'https://keplit.vercel.app', // Replace with actual notify URL
            payment_methods: 'cc,dc,upi',
          },
          order_amount,
          order_id: orderId,
          order_currency: 'INR',
          order_note: 'Thank you for your order!',
        },
      };
  
      // API Call to Cashfree
      const response = await axios.request(options);
      console.log('Cashfree Response:', response.data);
  
      if (response.data.payment_session_id) {
        return res.status(200).json({
          paymentSessionId: response.data.payment_session_id,
          success: true,
        });
      } else {
        return res.status(500).json({
          message: 'Error generating payment session ID.',
          success: false,
        });
      }
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      return res.status(500).json({
        message: error.response?.data?.message || 'An error occurred while creating the order.',
        success: false,
      });
    }
  };
export const checkStatus = async (req, res) => {
  const { orderid } = req.params;

  try {
    if (!orderid) {
      return res.status(400).json({
        message: 'Missing required parameter: orderid',
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
    console.log(response.data);

    const { order_status, payment_session_id } = response.data;

    if (order_status === 'PAID') {
      return res.redirect('http://localhost:3000/success');
    } else if (order_status === 'ACTIVE') {
      return res.redirect(`http://localhost:3000/${payment_session_id}`);
    } else {
      return res.redirect('http://localhost:3000/failure');
    }
  } catch (error) {
    console.error('Error checking order status:', error.response?.data || error.message);
    res.status(500).json({
      message: error.response?.data?.message || 'Something went wrong',
      success: false,
    });
  }
};
