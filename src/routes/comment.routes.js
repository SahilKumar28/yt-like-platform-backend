import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"

const commentRouter=Router()


import { getVideoComments } from "../controllers/comment/getvideocomments.controller"
import { addcomment } from "../controllers/comment/addcomment.controller"
import { updateComment } from "../controllers/comment/updatecomment.controller"
import { deleteComment } from "../controllers/comment/deletecomment.controller"

commentRouter.route("/getVideoComments").post(verifyjwt,getVideoComments)
commentRouter.route("/addcomment").post(verifyjwt,addcomment)
commentRouter.route("/updatecomment").post(verifyjwt,updateComment)
commentRouter.route("/deletecomment").post(verifyjwt,deleteComment)


export {commentRouter}