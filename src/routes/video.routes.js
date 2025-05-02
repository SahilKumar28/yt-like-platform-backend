import Router from "express"
import { upload } from "../middlewares/mullter.middleware.js"
import { verifyjwt } from "../middlewares/auth.middleware.js"

import { PublishVideo } from "../controllers/video/publishAvideo.controller.js"
import { getallvideos } from "../controllers/video/getallvideos.controller.js"
import { getVideo } from "../controllers/video/getvideo.controller.js"
import { updateVideoFile,updateThumbnail } from "../controllers/video/updateVideo.contorller.js"
import { deleteVideo } from "../controllers/video/deletevideo.controller.js"
import { togglepublishstatus } from "../controllers/video/togglepublishstatus.controller.js"

const VideoRouter=Router()

VideoRouter.route("/publish").post(verifyjwt,
    upload.fields(
        [
            {
                name:"videoFile",
                maxCount:1,
            },
          {
            name:"thumbnail",
            maxCount:1
          }
        ]
    ),
    PublishVideo
)

VideoRouter.route("/getAllvideos").post(verifyjwt,getallvideos)
VideoRouter.route("/getvideo").post(verifyjwt,getVideo)
VideoRouter.route("/updateVideoFile").post(verifyjwt,upload.single("videoFile"),updateVideoFile)
VideoRouter.route("/updateThumbnail").post(verifyjwt,upload.single("thumbnail"),updateThumbnail)
VideoRouter.route("/deletevideo").post(verifyjwt,deleteVideo)
VideoRouter.route("/togglepublishstatus").post(verifyjwt,togglepublishstatus)

export {VideoRouter}