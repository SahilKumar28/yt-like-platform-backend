import { Subscribtion } from "../../models/subscription.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const getChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    if (!channelId) throw new ApiError(400, "No ChannelId Found")

    const subscribers = await Subscribtion.countDocuments({ channel: channelId });

    if ((!(subscribers||subscribers!=0))) throw new ApiError(404, "Problem with subscriber no fetching")

    return res
        .status(200)
        .json(new ApiResponse(200, subscribers, "No of Subscribers Fetched Successfully"))

})

export {getChannelSubscribers}