import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Comment } from "../../models/comment.model.js"

const updateComment=asyncHandler(async(req,res)=>{
   const {content,commentId}=req.body
      if(!content || !commentId)throw new ApiError(400,"No content or commentId for updating")
   
      const comment=await Comment.findByIdAndUpdate(
       commentId,
       {
           $set:{content:content}
       },
       {
           new:true
       }
      )
   return res
   .status(200)
   .json(new ApiResponse(200,comment,"Comment Updated Successfully"))

})

export {updateComment}
