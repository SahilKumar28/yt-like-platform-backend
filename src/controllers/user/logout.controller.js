import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";

const logoutuser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{refreshtoken:undefined}
        },
        {
            new:true
        }
    )

    const options={
        httponly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json({
        status:200,
        message:"User Logged Out Successfully"
    })
})


export {logoutuser}