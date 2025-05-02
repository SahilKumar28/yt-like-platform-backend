import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Tweet } from "../../models/tweet.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const updateTweet=asyncHandler(async(req,res)=>{
    const {content,tweetId}=req.body
   if(!content || !tweetId)throw new ApiError(400,"No content or tweetId for updating tweet")

   const tweet=await Tweet.findByIdAndUpdate(
    tweetId,
    {
        $set:{content:content}
    },
    {
        new:true
    }
   )
return res
.status(200)
.json(new ApiResponse(200,tweet,"Tweet Updated Successfully"))
})

export {updateTweet}