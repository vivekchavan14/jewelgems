import express from 'express';

import { createPaymentSession, checkPaymentStatus} from '../controllers/cashfree.controller.js';
const router = express.Router();

router.post('/payment', createPaymentSession);
router.get('/status/:orderid', checkPaymentStatus);

export default router;
