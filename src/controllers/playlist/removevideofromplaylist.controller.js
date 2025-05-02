import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Playlist } from "../../models/playlist.model.js"

const removevideofromplaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

    if (!playlistId || !videoId) throw new ApiError(404, "PlaylistId or VideoId is mising")

    const playlist = await Playlist.findOne({ _id: playlistId })

    if (!playlist) throw new ApiError(404, "No Playlist Found")


    const index = playlist.video.indexOf(videoId)
    if (index !== -1) playlist.video.splice(index, 1)
    await playlist.save()

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed Successfully"))
})

export { removevideofromplaylist }