import axios from 'axios';

const secret_key = process.env.REACT_APP_CASHFREE_SECRET_KEY;
const app_id = process.env.REACT_APP_CASHFREE_APP_ID;

// Generate Order & Payment Session
export const createPaymentSession = async (req, res) => {
  try {
    const { customer_email, customer_phone, customer_name, order_amount } = req.body;

    // Validate required fields
    if (!customer_email || !customer_phone || !customer_name || !order_amount) {
      return res.status(400).json({
        message: 'Missing required fields: customer_email, customer_phone, customer_name, or order_amount',
        success: false,
      });
    }

    // Generate IDs
    const orderId = `ORID${Date.now()}`;
    const customerId = `CID${Date.now()}`;

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
          return_url: `http://localhost:8000/api/cashfree/status/${orderId}`,
          notify_url: 'https://your-server-url/notify', // Replace with actual notify URL
          payment_methods: 'cc,dc,upi',
        },
        order_amount,
        order_id: orderId,
        order_currency: 'INR',
        order_note: 'Thank you for your order!',
      },
    };

    const response = await axios.request(options);

    if (response.data.payment_session_id) {
      return res.status(200).json({
        paymentSessionId: response.data.payment_session_id,
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
    });
  }
};

// Check Payment Status
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

    if (order_status === 'PAID') {
      return res.redirect('http://localhost:3000/success');
    } else if (order_status === 'ACTIVE') {
      return res.redirect('http://localhost:3000/active');
    } else {
      return res.redirect('http://localhost:3000/failure');
    }
  } catch (error) {
    console.error('Error checking order status:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Error checking payment status.',
      success: false,
    });
  }
};
