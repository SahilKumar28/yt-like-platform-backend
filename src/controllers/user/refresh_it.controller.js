import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { generatetokens } from "./login.controller.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const Refresh_it=asyncHandler(async (req,res)=>{
    try {
        const incomingrefreshtoken=req.cookies?.refreshtoken
        if(!incomingrefreshtoken)throw new ApiError(401,"No RefreshToken Found In Envelope")
        
        const decodedtoken=jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decodedtoken?._id)
        if(!user)throw new ApiError(401,"Refreshtoken does not belong to the user")
        
        if(user.refreshtoken!==incomingrefreshtoken)throw new ApiError(401,"Invalid Refreshtoken-No Match With DB")
    
        const options={
            httponly:true,
            secure:true
        }
        
        const {newaccesstoken,newrefreshtoken}=generatetokens(user._id)
        return res
        .status(200)
        .cookie("accesstoken",newaccesstoken,options)
        .cookie("refreshtoken",newrefreshtoken,options)
        .json(
                new ApiResponse(200,"{}","AccessTokenRefreshed")
        )
    
    } catch (error) {
        console.log("Something Wrong With Refreshing Access Token")
    }
})

export {Refresh_it}