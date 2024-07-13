import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessTaken, registerUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name : "coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

/////////////////////////// secured routs

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessTaken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/get-current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").post(verifyJWT,updateAccountDetails)
router.route("/update-avatar").post(verifyJWT,upload.single("avatar"),updateAvatar)
router.route("/update-coverimage").post(verifyJWT,upload.single("coverImage"),updateCoverImage)

export default router   