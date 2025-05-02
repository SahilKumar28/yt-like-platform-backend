import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { User } from "../../models/user.model.js"
import { uploadoncloudinary } from "../../utils/cloudinary.js"
import { ApiResponse } from "../../utils/ApiResponse.js"


const registeruser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body

    let fields = [fullname, email, username, password]
    for (const field of fields) {
        if (!field) throw new ApiError(400, `${field} Is Missing`)
    }

    const existeduser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existeduser) throw new ApiError(404, "User Already Exists")

    const avatarlocalpath = req.files?.avatar[0]?.path
    const coverimagelocalpath = req.files?.coverimage?.[0]?.path
    if (!avatarlocalpath) throw new ApiError(404, "Avatar Is Reuired, No Avatar On Server")

    const avatar = await uploadoncloudinary(avatarlocalpath)
    let coverimage
    if (coverimagelocalpath) {
        coverimage = await uploadoncloudinary(coverimagelocalpath)
    }

    if (!avatar) throw new ApiError(404, "Avatar Is Reuired, No Avatar On Cloudinary")

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select("-password -refreshtoken")
    if (!createduser) throw new ApiError(500, "User Not Created")
    else return res.status(201).json(
        new ApiResponse(200, createduser, "User Registered Successfully")
    )
})


export { registeruser }