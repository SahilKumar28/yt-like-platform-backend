import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Like } from "../../models/like.model.js"

const getLikedVideos = asyncHandler(async (req, res) => {
    const liked_videos_with_owner_trim_info=await Like.aggregate([
        {$match:{video:{$ne:null}}},
        {$lookup:{
            from:"videos",
            localfield:"video",
            foreignField:"_id",
            as:"liked_videos",pipeline:[
                {$lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"liked_videos_with_owner_info"
                }},
                {
                    $project:{
                        fullname:1,
                        email:1,
                        avatar:1,
                        coverimage:1,
                        username:1
                    }
                }
            ]
        }}
    ])
    return res
    .status(200)
    .json(new ApiResponse(200,liked_videos_with_owner_trim_info,"All Liked Videos Fetched Successfully"))
})

export { getLikedVideos };