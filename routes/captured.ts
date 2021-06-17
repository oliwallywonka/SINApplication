import {Router} from "express"

import {
    getCaptured,
    createCaptured,
    eliminateCaptured
} from "../controllers/capturedController"

const router = Router();

router.get(
    '/',
    getCaptured
);
router.post(
    '/',
    createCaptured
);
router.delete(
    '/desactivate/:id',
    eliminateCaptured
);
export default router;