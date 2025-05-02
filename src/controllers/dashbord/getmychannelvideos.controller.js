import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import {Video} from "../../models/video.model.js"

const getChannelVideos=asyncHandler(async(req,res)=>{
 
const channelVideos=await Video.aggregate([
    {
        $match:{owner:req.user._id}
    },
    {
        $project:{
            videoFile:1,
            thumbnail:1,
            title:1,
            desciprion:1,
            views:1
        }
    }
])

return res
.status(200)
.json(new ApiResponse(200,channelVideos,"Channel Videos Fetched Successfully"))
})

export {getChannelVideos}