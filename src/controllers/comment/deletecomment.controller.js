import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Comment } from "../../models/comment.model.js"

const deleteComment=asyncHandler(async(req,res)=>{
    const { commentId } = req.body
    if (!commentId) throw new ApiError(400, "No commentId found for deleting")

    await Comment.findByIdAndDelete(commentId)

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment Deleted Successfully"))
})

export {deleteComment}
