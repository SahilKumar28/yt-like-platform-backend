import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Like } from "../../models/like.model.js"

const toggleVideoLike=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    if(!videoId)throw new ApiError(400,"No VideoId Founded")
    
    const is_video_liked=await Like.findOne({video:videoId,likedBy:req.user._id})
    
    if(is_video_liked){
        await Like.findByIdAndDelete(is_video_liked._id)
        return res.status(200)
        .json(new ApiResponse(200,null,"Unliked The Video"))
    }
    else{
        const like=await Like.create({
            video:videoId,
            tweet:null,
            comment:null,
            likedBy:req.user._id
        })

        return res
        .status(200)
        .json(new ApiResponse(200,like,"Liked The Video"))
    }


})

export {toggleVideoLike}