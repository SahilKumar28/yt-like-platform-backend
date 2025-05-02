import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"


const likeRouter=Router()

import { toggleVideoLike } from "../controllers/like/togglevideolike.controller"
import { toggleTweetLike } from "../controllers/like/toggletweetlike.controller"
import { toggleCommentLike } from "../controllers/like/togglecommentlike.controller"
import { getLikedVideos } from "../controllers/like/getlikedvideos.controller"

likeRouter.route("/toggleVideoLike").post(verifyjwt,toggleVideoLike)
likeRouter.route("/togglecommentLike").post(verifyjwt,toggleCommentLike)
likeRouter.route("/toggletweetLike").post(verifyjwt,toggleTweetLike)
likeRouter.route("/toggleVideoLike").post(verifyjwt,getLikedVideos)

export {likeRouter}