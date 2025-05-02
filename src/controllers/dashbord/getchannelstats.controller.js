import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import {Video} from "../../models/video.model.js"
import {Subscribtion} from "../../models/subscription.model.js"
import {Like} from "../../models/like.model.js"


const getchannelstats=asyncHandler(async(req,res)=>{
    
    const all_info=await Video.aggregate([
        {$match:{owner:req.user._id}},
            {$lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"all_docs_with_this_video_being_liked"
            }}
    ])

     let total_videos=all_info.length

     let total_views=0,total_likes=0

     for (const video of all_info) {
        total_views=total_views+video.views
        total_likes=total_likes+(video.all_docs_with_this_video_being_liked.length)
     }
     
     const subscribers=await Subscribtion.countDocuments({channel:req.user._id})

    const data={
        videos:total_videos,
        views:total_views,
        likes:total_likes,
        subscribers:subscribers
    }

    return res
    .status(200)
    .json(new ApiResponse(200,data,"Channel Stats Fetched Successfully"))

})


export {getchannelstats}