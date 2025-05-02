import { Router } from "express";
import { registeruser } from "../controllers/user/register.controller.js"
import {upload} from "../middlewares/mullter.middleware.js"
import { loginuser } from "../controllers/user/login.controller.js"
import { logoutuser } from "../controllers/user/logout.controller.js"
import { verifyjwt } from "../middlewares/auth.middleware.js"
import { Refresh_it } from "../controllers/user/refresh_it.controller.js"
import { changepassword } from "../controllers/user/changepassword.controller.js"
import { getCurrentUser } from "../controllers/user/getcurrentuser.contorller.js"
import { updateinfo } from "../controllers/user/update.controller.js"
import { updateAvatar,updateCoverImage } from "../controllers/user/updatefiles.controller.js"
import { getUserProfile } from "../controllers/user/getUserprofile.controller.js"
import { getwatchhistory } from "../controllers/user/getwatchhistory.controller.js"

const UserRouter=Router()


/*jab kisi bhi router per file ayegi, us route ko btana parega ke server per store kese hogi aur unki thori
aur details*/
UserRouter.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registeruser
)

UserRouter.route("/login").post(loginuser)

UserRouter.route("/logout").post(verifyjwt,logoutuser) 

UserRouter.route("/refresh").post(Refresh_it)

UserRouter.route("/changepassword").post(verifyjwt,changepassword)

UserRouter.route("/getcurrentuser").get(verifyjwt,getCurrentUser)

UserRouter.route("/updateinfo").patch(verifyjwt,updateinfo)

UserRouter.route("/updateavatar").patch(verifyjwt,upload.single("avatar"),updateAvatar)

UserRouter.route("/updatecoverimage").patch(verifyjwt,upload.single("coverimage"),updateCoverImage)

UserRouter.route("/getuserprofile").get(verifyjwt,getUserProfile)

UserRouter.route("/getwatchhistory").get(verifyjwt,getwatchhistory)



export {UserRouter}