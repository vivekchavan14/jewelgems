


import { PaymentGateway } from '@cashfreepayments/cashfree-sdk';

export const cashfree = new PaymentGateway({
    appId: process.env.CASHFREE_APP_ID,
    secretKey: process.env.CASHFREE_SECRET_KEY,
    env: process.env.CASHFREE_ENV, // 'TEST' or 'PROD'
});



