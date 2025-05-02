import { Video } from "../../models/video.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const getallvideos=asyncHandler(async (req,res)=>{
    const {page=1,limit=10}=req.query

    const options={
        page:parseInt(page),
        limit:parseInt(limit)
    }

    const allvideos=[
            {$lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"ownerdetails",
                pipeline:[
                    {
                        $project:{
                            fullname:1,
                            email:1,
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }},
           {
            $sort:{views:-1}
           }
        ]

    
   const result=await Video.aggregatePaginate(Video.aggregate(allvideos),options)
   
    return res
    .status(200)
    .json(new ApiResponse(200,result,"All Videos Fetched Successully"))
   
})

export {getallvideos}