import { Router } from "express";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import { sendMessage } from "./message.controller.js";
import { sendMessageSchema } from "./message.validation.js";
const router = Router();

router.post('/sendMessage/:receiver_id',auth(['user']),validation(sendMessageSchema),asyncHandler(sendMessage));


export default router;