import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updateinfo=asyncHandler(async(req,res)=>{
    const {fullname}=req.body
    if(!fullname)throw new ApiError(401,"Fullname Is Required")

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname:fullname
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Updated Successfully"))
    
})

export {updateinfo}