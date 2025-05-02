import { User } from "../../models/user.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const generatetokens = async (userID) => {
    const user = await User.findById(userID)
    const accesstoken = await user.generateAccessToken()
    const refreshtoken = await user.generateRefreshToken()

    user.refreshtoken = refreshtoken
    user.save({ validateBeforeSave: false })

    return { accesstoken, refreshtoken }
}


const loginuser = asyncHandler(async (req, res) => {
    const { email,username, password } = req.body
    
    if (!username && !email) throw new ApiError(404, "Username or Email Is Requied")
    if (!password) throw new ApiError(400, "Password Is Required")

    const user = await User.findOne({
        $or: [{ username:username },
              {email:email}
        ]
    })


    // console.log(`${username} ${email}`)

    if (!user) throw new ApiError(404, "User Does Not Exist")

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) throw new ApiError(400, "Password Is Invalid")

    const { accesstoken, refreshtoken } = await generatetokens(user._id)


    const LoggedInUser=await User.findById(user._id).select("-password -refreshtoken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accesstoken",accesstoken,options)
    .cookie("refreshtoken",refreshtoken,options)
    .json(
        new ApiResponse(
            200, 
            {
             user:LoggedInUser,accesstoken,refreshtoken
            },
            "User LoggedIn Successfully"
        )
   )
})

export {loginuser}
export {generatetokens}