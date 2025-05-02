import { Video } from "../../models/video.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"


const getVideo=asyncHandler(async(req,res)=>{
    const {videoId}=req.params

    const video=await Video.findById(videoId)

    if(!video)throw new ApiError(400,"Video Not Found")
        
    return res
    .status(200)
    .json(new ApiResponse(200,video,"Video Fetched Successfully"))
})

export {getVideo}