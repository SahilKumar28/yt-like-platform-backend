import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Playlist } from "../../models/playlist.model.js"

const updatePlaylist=asyncHandler(async(req,res)=>{
    const {playlistId}=req.params
    const {name,description}=req.body

    if(!playlistId || !name || !description)throw new ApiError(404,"Something Missing While Updating Playlist")

    const playlist=await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{name:name,description:description}
        },
        {
            new:true
        }
    )

    if(!playlist)throw new ApiError(404,"Something Problematic While Updating Playlist")

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"Playlist Updated Successfully"))
})

export {updatePlaylist}