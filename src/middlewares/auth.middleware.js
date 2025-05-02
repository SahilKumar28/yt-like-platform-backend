import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyjwt=asyncHandler(async (req,res,next)=>{
    try {
        const token=req.cookies?.accesstoken
        // console.log("token:",token,typeof token)
        if(token==="undefined"||token===null||token==="") throw new ApiError(401,"Unauthorized Request")
        
         const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedtoken?._id).select("-password -refreshtoken")
        if(!user)throw new ApiError(401,"Invalid Access Token")
        
        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,"Something Wrong During Access Token Validation:",error)
    }
})

export {verifyjwt}
