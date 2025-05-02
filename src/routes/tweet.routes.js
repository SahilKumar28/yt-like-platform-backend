import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"
const tweetRouter=Router()

import { createTweet } from "../controllers/tweet/createtweet.controller"
import { getUserTweets } from "../controllers/tweet/getUsertweets.controller"
import { updateTweet } from "../controllers/tweet/updatetweet.contorller"
import { deleteTweet } from "../controllers/tweet/deletetweet.controller"

tweetRouter.route("/createTweet").post(verifyjwt,createTweet)
tweetRouter.route("/GetUserTweets").post(verifyjwt,getUserTweets)
tweetRouter.route("/UpdateTweet").post(verifyjwt,updateTweet)
tweetRouter.route("/DeleteTweet").post(verifyjwt,deleteTweet)


export {tweetRouter}