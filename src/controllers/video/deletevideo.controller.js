import { Video } from "../../models/video.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { uploadoncloudinary } from "../../utils/cloudinary.js"

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) throw new ApiError(401, "No VideoId Founded")

    await Video.findByIdAndDelete(videoId)

    return res
    .status(200)
    .json(new ApiResponse(200,null,"Video Deleted Successfully"))
})

export {deleteVideo}