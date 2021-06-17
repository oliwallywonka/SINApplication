import {Router} from 'express';

import {
    getQR,
    whatsappConnect,
    whatsappMessage
} from '../controllers/whatsappController';

const router = Router();

router.post(
    '/connect',
    whatsappConnect,
);
router.post(
    '/message',
    whatsappMessage
);
router.post(
    '/qr',
    getQR
);

export default router;

