import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"

const playlistRouter=Router()


import { addVideoToPlaylist } from "../controllers/playlist/addvideotoplaylist.controller"
import { createPlaylist } from "../controllers/playlist/createplaylist.controller"
import { deleteplaylist } from "../controllers/playlist/deleteplaylist.controller"
import { getPlaylistById } from "../controllers/playlist/getplaylistbyId.contorller"
import { getUserPlaylists } from "../controllers/playlist/getuserplaylist.controller"
import { removevideofromplaylist } from "../controllers/playlist/removevideofromplaylist.controller"
import { updatePlaylist } from "../controllers/playlist/updateplaylist.controller"

playlistRouter.route("/addvideotoplaylist").post(verifyjwt,addVideoToPlaylist)
playlistRouter.route("/createplaylist").post(verifyjwt,createPlaylist)
playlistRouter.route("/deleteplaylist").post(verifyjwt,deleteplaylist)
playlistRouter.route("/getplaylistbyId").post(verifyjwt,getPlaylistById)
playlistRouter.route("/getuserplaylists").post(verifyjwt,getUserPlaylists)
playlistRouter.route("/removevideofromplaylists").post(verifyjwt,removevideofromplaylist)
playlistRouter.route("/updateplaylists").post(verifyjwt,updatePlaylist)

export {playlistRouter}