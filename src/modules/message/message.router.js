import { Router } from "express";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import { sendMessage,getReceivedMessages,deleteMessage} from "./message.controller.js";
import { sendMessageSchema,deleteMessageSchema } from "./message.validation.js";
const router = Router();

router.post('/sendMessage/:receiver_id',auth(['user','Admin']),validation(sendMessageSchema),asyncHandler(sendMessage));
router.get('/getReceivedMessages',auth(['user','Admin']),asyncHandler(getReceivedMessages));
router.delete("/deleteMessage/:id", auth(["user",'Admin']),validation(deleteMessageSchema), asyncHandler(deleteMessage));


export default router;