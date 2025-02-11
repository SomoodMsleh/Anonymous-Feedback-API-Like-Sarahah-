import { Router } from "express";
import validation from "../../middleware/validation.js";
import {loginUser,registerUser} from "./auth.controller.js"
import {asyncHandler} from "../../utils/catchError.js"
import { loginSchema,registerSchema } from "./auth.validation.js";
const router = Router();

router.post('/register',validation(registerSchema),asyncHandler(registerUser));
router.post('/login',validation(loginSchema),asyncHandler(loginUser));
export default router;