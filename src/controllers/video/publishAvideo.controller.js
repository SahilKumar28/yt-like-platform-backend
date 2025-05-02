import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { uploadoncloudinary } from "../../utils/cloudinary.js"
import {Video} from "../../models/video.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const PublishVideo = asyncHandler(async (req, res) => {
    //data extract karoge
    //files ko server per set karke cloudinery ko call karoge

    const { title, description } = req.body
    //owner req.user._id se miljayega
    if (!title || !description) throw new ApiError(401, "Title or Description is missing")

    const videolocalpath = req.files?.videoFile?.[0]?.path
    const thumbnaillocalpath = req.files?.thumbnail?.[0]?.path

    if (!videolocalpath || !thumbnaillocalpath) throw new ApiError(401, "Thumnail or Video Missing on server")

    const video_on_cloud = await uploadoncloudinary(videolocalpath)
    const thumbnail_on_cloud = await uploadoncloudinary(thumbnaillocalpath)

    if (!video_on_cloud || !thumbnail_on_cloud) throw new ApiError(401, "Thumnail or Video Missing on cloudinary")

    const video=await Video.create({
       title,
       description,
       thumbnail:thumbnail_on_cloud.url,
       videoFile:video_on_cloud.url,
       isPublished:true,
       owner:req.user._id,
       duration:video_on_cloud.duration,
    })

     const published_video=await Video.findById(video._id).select("-views")
     if(!published_video)throw new ApiError(500,"Video Not Published")
     
    return res
    .status(200)
    .json(new ApiResponse(200,published_video,"Video Published Successdully"))

})

export {PublishVideo}