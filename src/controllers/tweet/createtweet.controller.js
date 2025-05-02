import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Tweet } from "../../models/tweet.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const createTweet=asyncHandler(async(req,res)=>{
    const{content}=req.body
    if(!content)throw new ApiError(404,"No content founded")
    const tweet=await Tweet.create({
      owner:req.user._id,
      content
    })

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"Tweet Created Successfully"))
})

export {createTweet}