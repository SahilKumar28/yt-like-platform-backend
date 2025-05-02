import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Like } from "../../models/like.model.js"

const toggleCommentLike=asyncHandler(async(req,res)=>{
    const {commentId}=req.params
    if(!commentId)throw new ApiError(400,"No CommentId Founded")
    
    const is_comment_liked=await Like.findOne({comment:commentId,likedBy:req.user._id})
    
    if(is_comment_liked){
        await Like.findByIdAndDelete(is_comment_liked._id)
        return res.status(200)
        .json(new ApiResponse(200,null,"Unliked The Comment"))
    }
    else{
        const comment=await Like.create({
            video:null,
            tweet:null,
            comment:commentId,
            likedBy:req.user._id
        })

        return res
        .status(200)
        .json(new ApiResponse(200,comment,"Liked The Comment"))
    }


})

export {toggleCommentLike}