import { Router } from "express";
import { getUsers,getInactiveUser,getDeactivateUser,deleteUser,changePassword,uploadProfilePicture,deactivateUser,reactivateUser,searchUser} from "./user.controller.js";
import {asyncHandler} from "../../utils/catchError.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js"
import uploadFile from "../../utils/multer.js";
const router = Router();

router.get('/',auth(["Admin"]),asyncHandler(getUsers)); //  [Token Required]
router.get('/inactive',auth(["Admin"]),asyncHandler(getInactiveUser));
router.get('/deactivate',auth(['Admin']),asyncHandler(getDeactivateUser));
router.delete('/:id',auth(['Admin']),asyncHandler(deleteUser));
router.put('/changePassword/:id',auth(['Admin','user']),asyncHandler(changePassword));
router.put("/uploadProfilePicture/:id",auth(['Admin','user']),uploadFile().single("image"),uploadProfilePicture);
router.put('/deactivateUser/:id',auth(['user','Admin']),deactivateUser);
router.put('/reactivateUser/:id',auth(['user','Admin']),reactivateUser);
router.post('/searchUser',auth(['user','Admin']),searchUser);
export default router;
