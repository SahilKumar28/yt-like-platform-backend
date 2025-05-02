import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Like } from "../../models/like.model.js"

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) throw new ApiError(400, "No TweetId Found")

    const is_tweet_liked = await Like.findOne({ tweet: tweetId, likedBy: req.user._id })

    if (is_tweet_liked) {
        await Like.findByIdAndDelete(is_tweet_liked._id);
        return res.status(204).json(new ApiResponse(204, null, "Unliked The Tweet"))
    } else {
        const tweet = await Like.create({
            video: null,
            tweet: tweetId,
            comment: null,
            likedBy: req.user._id,
        })

        return res.status(201).json(new ApiResponse(201, tweet, "Liked The Tweet"))
    }
})

export { toggleTweetLike }