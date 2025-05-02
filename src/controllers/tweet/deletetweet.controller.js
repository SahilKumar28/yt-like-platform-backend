import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Tweet } from "../../models/tweet.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.body
    if (!tweetId) throw new ApiError(400, "No tweetId found for deleting")

    await Tweet.findByIdAndDelete(tweetId)

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Tweet Deleted Successfully"))
})

export { deleteTweet }