import { Router } from "express";
import { getUsers,getInactiveUser,getDeactivateUser,deleteUser,changePassword,uploadProfilePicture,deactivateUser,reactivateUser,updateUserRole,searchUser} from "./user.controller.js";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import uploadFile from "../../utils/multer.js";
import {deactivateUserSchema,reactivateUserSchema,searchUserSchema,changePasswordSchema,uploadProfilePictureSchema,deleteUserSchema} from './user.validation.js'
const router = Router();

router.get('/',auth(["Admin"]),asyncHandler(getUsers)); //  [Token Required]
router.get('/inactive',auth(["Admin"]),asyncHandler(getInactiveUser));
router.get('/deactivate',auth(['Admin']),asyncHandler(getDeactivateUser));
router.delete('/:id',auth(['Admin']),validation(deleteUserSchema),asyncHandler(deleteUser));
router.put('/changePassword/:id',auth(['Admin','user']),validation(changePasswordSchema),asyncHandler(changePassword));
router.put("/uploadProfilePicture/:id",auth(['Admin','user']),validation(uploadProfilePictureSchema),uploadFile().single("image"),uploadProfilePicture);
router.put('/deactivateUser/:id',auth(['user','Admin']),validation(deactivateUserSchema),deactivateUser);
router.put('/reactivateUser/:id',auth(['user','Admin']),validation(reactivateUserSchema),reactivateUser);
router.post('/searchUser',auth(['user','Admin']),validation(searchUserSchema),searchUser);
router.put("/updateUserRole/:id", auth(["Admin"]), asyncHandler(updateUserRole));
export default router;
