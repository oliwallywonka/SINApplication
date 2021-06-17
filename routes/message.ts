import {Router} from "express"

import {
    getMessages,
    updateMessage,
    createMessage,
    eliminateMessage
} from "../controllers/messageController"

const router = Router();

router.get(
    '/',
    getMessages
);
router.post(
    '/',
    createMessage
);
router.put(
    '/:id',
    updateMessage
);
router.put(
    '/desactivate/:id',
    eliminateMessage
);
export default router;



