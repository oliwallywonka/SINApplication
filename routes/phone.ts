import {Router} from "express"

import {
    getPhones,
    updatePhone,
    createPhone,
    activatePhone,
    desactivatePhone
} from "../controllers/phoneController"

const router = Router();

router.get(
    '/',
    getPhones
);
router.post(
    '/',
    createPhone
);
router.put(
    '/:id',
    updatePhone
);
router.put(
    '/desactivate/:id',
    desactivatePhone
);
router.delete(
    '/activate/:id',
    activatePhone
);
export default router;