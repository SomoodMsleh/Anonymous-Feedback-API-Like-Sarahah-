import { Router } from "express";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import { sendMessage,getReceivedMessages} from "./message.controller.js";
import { sendMessageSchema } from "./message.validation.js";
const router = Router();

router.post('/sendMessage/:receiver_id',auth(['user','Admin']),validation(sendMessageSchema),asyncHandler(sendMessage));
router.get('/getReceivedMessages',auth(['user','Admin']),asyncHandler(getReceivedMessages));


export default router;