import { Router } from "express";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import { sendMessage,getReceivedMessages,deleteMessage,markMessageAsRead,getUnreadMessages,getAllMessages,reportOffensiveMessage,getAllReportedMessages,getReportDetails} from "./message.controller.js";
import { sendMessageSchema,deleteMessageSchema,markMessageAsReadSchema ,reportOffensiveMessageSchema,getReportDetailsSchema} from "./message.validation.js";
const router = Router();

router.post('/sendMessage/:receiver_id',auth(['user','Admin']),validation(sendMessageSchema),asyncHandler(sendMessage));
router.get('/getReceivedMessages',auth(['user','Admin']),asyncHandler(getReceivedMessages));
router.delete("/deleteMessage/:id", auth(["user",'Admin']),validation(deleteMessageSchema), asyncHandler(deleteMessage));
router.put("/read/:id", auth(["user",'Admin']),validation(markMessageAsReadSchema),asyncHandler(markMessageAsRead));
router.get('/getUnreadMessages',auth(['user','Admin']),asyncHandler(getUnreadMessages));
router.get("/getAllMessages", auth(["Admin"]), asyncHandler(getAllMessages));
router.put("/report/:id", auth(["user",'Admin']),validation(reportOffensiveMessageSchema),asyncHandler(reportOffensiveMessage));
router.get('/ReportedMessages', auth(['Admin']), asyncHandler(getAllReportedMessages));
router.get('/reportDetails/:id', auth(['Admin']),validation(getReportDetailsSchema),asyncHandler(getReportDetails));

export default router;