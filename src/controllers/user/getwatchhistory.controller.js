import { asyncHandler } from "../../utils/asyncHandler.js"
import { User } from "../../models/user.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const getwatchhistory=asyncHandler(async(req,res)=>{
    const user=User.aggregate([
        {
            $match:{    
                _id:new mongoose.Types.ObjectId(req.user._id)
                //req.user._id is string by default which is converted to objectid by mongoose on its own using
                //objectid method. But in aggregation pipelines, mongoose says "apna khud dekhlo". To hamein 
                //explicitly karna parta ha. String are of no use, hamein unhen objextId mainn convert karna zaroori
                //ha. Sab oper objectID per hi hote hain.
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"watchhistory",
                foreignField:"_id",
                as:"watchhistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullname:1,
                                        username:1,
                                        avatar:1
                                    }
                                },
                                {
                                    $addFields:{
                                        owner:{
                                            $first:"$owner"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        } 
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,user[0].watchhistory,"WatchHistoryFetchedSuccessfully"))
})

export {getwatchhistory}