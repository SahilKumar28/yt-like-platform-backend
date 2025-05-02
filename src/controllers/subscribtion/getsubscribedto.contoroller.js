import { Subscribtion } from "../../models/subscription.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const getsubscribedto = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if (!subscriberId) throw new ApiError(400, "No Subscriber Id Founded")

    const subscribed_to = await Subscribtion.countDocuments({ subscriber: subscriberId })

    return res
    .status(200)
    .json(new ApiResponse(200,subscribed_to,"Subscribed_to fetched successfully"))


})

export {getsubscribedto}