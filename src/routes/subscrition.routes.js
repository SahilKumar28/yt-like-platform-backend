import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"

const subscribtionRouter=Router()


import { toggleSubscribtion } from "../controllers/subscribtion/togglesubscribtion.contorller"
import { getChannelSubscribers } from "../controllers/subscribtion/getchannelsubscribers.controller"
import { getsubscribedto } from "../controllers/subscribtion/getsubscribedto.contoroller"

subscribtionRouter.route("/togglesubscription").post(verifyjwt,toggleSubscribtion)
subscribtionRouter.route("/getChannelSubscribers").post(verifyjwt,getChannelSubscribers)
subscribtionRouter.route("/getSubscribedTo").post(verifyjwt,getsubscribedto)


export {subscribtionRouter}