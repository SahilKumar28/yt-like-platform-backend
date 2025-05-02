import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookiesParser())

import { UserRouter } from "./routes/user.routes.js"
import { VideoRouter } from "./routes/video.routes.js"
import { subscribtionRouter } from "./routes/subscrition.routes.js"
import { tweetRouter } from "./routes/tweet.routes.js"
import { commentRouter } from "./routes/comment.routes.js"
import { likeRouter } from "./routes/like.routes.js"
import { playlistRouter } from "./routes/playlist.routes.js"

app.use("/users",UserRouter)
app.use("/videos",VideoRouter)
app.use("/subscribtions",subscribtionRouter)
app.use("/tweets",tweetRouter)
app.use("/comments",commentRouter)
app.use("/likes",likeRouter)
app.use("/playlists",playlistRouter)

export {app}