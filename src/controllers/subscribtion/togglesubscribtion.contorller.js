import { Subscribtion } from "../../models/subscription.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"


const toggleSubscribtion=asyncHandler(async(req,res)=>{
   const {channelId}=req.params
   if(!channelId) throw new ApiError(400,"ChannelId Not Found")
   
   const required_doc=await Subscribtion.findOne({
    channel:channelId,
    subscriber:req.user._id
   })
   
   if(required_doc){
    await Subscribtion.findByIdAndDelete(required_doc._id)
    return res
    .status(200)
    .json(new ApiResponse(200,{isSubscribed:false},"Unsubscribed Successfully"))
   }
   else{
    const new_subscribtion=await Subscribtion.create({
        channel:channelId,
        subscriber:req.user._id
    })
    return res.status(200)
    .json(new ApiResponse(200,new_subscribtion,"Subscribed Successfully"))
   }

})

export {toggleSubscribtion}