import { User } from "../../models/user.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const changepassword=asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword}=req.body
    const user=await User.findById(req.user?._id)
    const ispasswordvalid=await user.isPasswordCorrect(oldpassword)
    if(!ispasswordvalid)throw new ApiError(401,"Wrong Password Entered While Changing Password")
    
    user.password=newpassword
    user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Password Changed Successfully")
    )
})

export {changepassword}