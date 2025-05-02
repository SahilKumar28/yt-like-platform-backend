import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { Comment } from "../../models/comment.model.js"

const getVideoComments=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    if(!videoId)throw new ApiError(400,"No VideoId founded")
    const {page=1,limit=10}=req.query
    
    const options={
        page:Number(page),
        limit:Number(limit)
    }

    const pipelines=[
        {$match:{video:videoId}}
    ]
    
    const all_comments=await Comment.aggregatePaginate(Comment.aggregate(pipelines),options)

    return res
    .status(200)
    .json(new ApiResponse(200,all_comments,"Comments Fetched From Video Successfully"))
})

export {getVideoComments}