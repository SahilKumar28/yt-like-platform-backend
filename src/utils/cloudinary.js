import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadoncloudinary=async (localfilepath)=>{
    try {
        if(!localfilepath) return console.log("Local File Path Does Not Exist")
        const response=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        // console.log("File has been successfuly uplaoded on the cloudinery and have URL:",response.url)
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)
        console.log("Error found while upploading on the cloudinery:",error)
    }
}

export {uploadoncloudinary}