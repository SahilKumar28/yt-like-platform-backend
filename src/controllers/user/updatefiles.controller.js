import { User } from "../../models/user.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { uploadoncloudinary } from "../../utils/cloudinary.js"

const updateAvatar=asyncHandler(async(req,res)=>{
    const avatarpath=req.file?.path
    if(!avatarpath)throw new ApiError(400,"Problem With Upload On Server")

    const avatar=await uploadoncloudinary(avatarpath)
    if(!avatar.url)throw new ApiError(401,"Problem With Upload On Cloudinary")

    User.findByIdAndUpdate(
        req.user?._id,
        {$set:{avatar:avatar.url}},
        {new:true}
    ).select("-password")
})

const updateCoverImage=asyncHandler(async(req,res)=>{
    const coverimagepath=req.file?.path
    if(!coverimagepath)throw new ApiError(400,"Problem With Upload On Server")

    const coverimage=await uploadoncloudinary(coverimagepath)
    if(!coverimage.url)throw new ApiError(401,"Problem With Upload On Cloudinary")

    User.findByIdAndUpdate(
        req.user?._id,
        {$set:{coverimage:coverimage.url}},
        {new:true}
    ).select("-password")
})

export {updateAvatar,updateCoverImage}