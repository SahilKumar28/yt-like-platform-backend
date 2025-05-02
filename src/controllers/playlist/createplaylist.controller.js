import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import {Playlist} from "../../models/playlist.model.js"

const createPlaylist=asyncHandler(async(req,res)=>{
    const {name,description}=req.body
    if(!name || !description)throw new ApiError(404,"Name or Description Not Found")

    const playlist=await Playlist.create({
      name,
      description,
      owner:req.user._id,
      video:[]
    })

    if(!playlist)throw new ApiError(401,"Problems with making of playlist")

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"Playlist Made Successfully"))
})

export {createPlaylist}