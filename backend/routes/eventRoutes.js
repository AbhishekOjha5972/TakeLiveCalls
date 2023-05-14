const express = require('express')
const { getEventController, postEventController, joinIntoTheEventPartiallyController, joinUserIntoTheEventController, getOptions, getSpecificEventController, getUsersAllEventController } = require('../controllers/event.controllers')


const eventRouter = express.Router()

eventRouter.get("/",getEventController)
eventRouter.get("/options",getOptions)
eventRouter.get("/:Id",getSpecificEventController)
eventRouter.get("/personal",getUsersAllEventController)
eventRouter.post("/",postEventController)
eventRouter.post("/partiallyjoined/:Id",joinIntoTheEventPartiallyController)
eventRouter.patch("/join/:Id",joinUserIntoTheEventController)


module.exports = {eventRouter}