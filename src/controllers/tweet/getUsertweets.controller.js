import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Tweet } from "../../models/tweet.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const getUserTweets=asyncHandler(async(req,res)=>{
    const {ownerId}=req.params
    if(!ownerId) throw new ApiError(400,"No ownerId founded")
   const all_docs=await Tweet.aggregate([
    {
        $match:{owner:ownerId}
    }
   ])
   return res
   .status(200)
   .json(new ApiResponse(200,all_docs,"tweets fetched successfully"))
})

export {getUserTweets}