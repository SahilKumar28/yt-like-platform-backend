import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import {Playlist} from "../../models/playlist.model.js"

const getUserPlaylists=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    if(!userId) throw new ApiError(404,"No UserId found for fetching playlist")

    const playlists_of_specified_user=await Playlist.aggregate([
        {$match:{owner:userId}}
    ])
    
    if(!playlists_of_specified_user)throw new ApiError(404,"Problems with Playlist fetching")

    return res
    .status(200)
    .json(new ApiResponse(200,playlists_of_specified_user,"Playlists Fetched Successfully"))

})

export {getUserPlaylists}