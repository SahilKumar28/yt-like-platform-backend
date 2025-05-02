import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Playlist } from "../../models/playlist.model.js"

const deleteplaylist=asyncHandler(async(req,res)=>{
    const {playlistId}=req.params

    if(!playlistId)throw new ApiError(404,"Playlistid Missing While Deleting Playlist")
  
    await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(new ApiResponse(200,null,"Playlist Deleted Successfully"))
})

export {deleteplaylist}