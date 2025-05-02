import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import {Playlist} from "../../models/playlist.model.js"

const getPlaylistById=asyncHandler(async(req,res)=>{
   const {playlistId}=req.params
   
   if(!playlistId)throw new ApiError(404,"playlistId not found")

   const playlist= await Playlist.findOne({_id:playlistId})
   if(!playlist)throw new ApiError(404,"Problems with fetching playlist")
   
    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"Playlist Fetched Successfully"))
})


export {getPlaylistById}