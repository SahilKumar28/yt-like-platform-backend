import { Video } from "../../models/video.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { uploadoncloudinary } from "../../utils/cloudinary.js"


const updateVideoFile=asyncHandler(async (req,res)=>{

    const {videoId}=req.params

    const videoFilelocalpath=req.file?.path
    if(!videoFilelocalpath)throw new ApiError(404,"No File For Updating On Server")

    const vidoeFile_on_cloud=await uploadoncloudinary(videoFilelocalpath)
    if(!vidoeFile_on_cloud) throw new ApiError(404,"No File For Updating On Cloudinary")
     
    const video=await Video.findById(videoId)
    video.videoFile=vidoeFile_on_cloud.url
    video.save()

    return res
    .status(200)
    .json(new ApiResponse(200,video,"VideoFile Updated Successfully"))

})


const updateThumbnail=asyncHandler(async (req,res)=>{

    const {videoId}=req.params

    const thumbnaillocalpath=req.file?.path
    if(!thumbnaillocalpath)throw new ApiError(404,"No File For Updating On Server")

    const thumbnail_on_cloud=await uploadoncloudinary(thumbnaillocalpath)
    if(!thumbnail_on_cloud) throw new ApiError(404,"No File For Updating On Cloudinary")
     
    const video=await Video.findById(videoId)
    video.thumbnail=thumbnail_on_cloud.url
    video.save()

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Thumbnail Updated Successfully"))

})

export {updateVideoFile,updateThumbnail}