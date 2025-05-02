import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Comment } from "../../models/comment.model.js"

const addcomment=asyncHandler(async (req,res)=>{
    const {content,videoId}=req.body
    if(!content || !videoId)throw new ApiError(404,"Content or VideoId missing")

    const comment=await Comment.create({
        content,
        owner:req.user._id,
        video:videoId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"Comment Added Successfully"))
})

export {addcomment}