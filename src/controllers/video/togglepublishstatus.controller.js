import { Video } from "../../models/video.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const togglepublishstatus=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    if(!videoId)throw new ApiError(401,"No VideoIf Founded")
       
    const video=await Video.findById(videoId)
    video.isPublished=!video.isPublished

    await video.save()

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Toggled Successfully"))

})

export {togglepublishstatus}