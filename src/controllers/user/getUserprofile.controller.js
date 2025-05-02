import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"


const getUserProfile=asyncHandler(async(req,res)=>{
    const{username}=req.params
    if(!username)throw new ApiError(404,"No Username Found In Profile Fetching")
    
    const channel=await User.aggregate([
        {$match:{username:username}},

        {$lookup:{
         from:"subscriptions",
         localField:"_id",
         foreignField:"channel",
         as:"subscribers"
        }},

        {$lookup:{
            from:"subscriptions",
            localField:"_id",
            foreignField:"subscriber",
            as:"subscribedto"
           }},

        {$addFields:{
            subscribers_count:{$size:"$subscribers"},
            subscribedto_count:{$size:"$subscribedto"},
            issubsribed:{
                $cond:{
                    if:{$in:[req.user?._id,"$subscribers.subscriber"]},
                    then:true,
                    else:false
                    }
            }
           }   
        },
        {
            Sproject:{
                fullname:1,
                avatar:1,
                coverimage:1,
                subscribers_count:1,
                subscribedto_count:1,
                issubscribed:1,
                username:1,
                email:1
            }
        }
    ])
    if(!channel?.length)throw new ApiError(401,"Problems With Solutions")

    return res
    .status(200)
    .json(new ApiResponse(200,channel[0],"User Profile Fetched Successfully"))
})

export {getUserProfile}