import express from 'express';

import { newOrderId, checkStatus } from '../controllers/cashfree.controller.js';
const router = express.Router();

router.post('/payment', newOrderId);
router.get('/status/:orderid', checkStatus);

export default router;
