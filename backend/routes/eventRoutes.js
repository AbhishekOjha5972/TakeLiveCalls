const express = require('express')
const { getEventController, postEventController, joinIntoTheEventPartiallyController, joinUserIntoTheEventController } = require('../controllers/event.controllers')


const eventRouter = express.Router()

eventRouter.get("/",getEventController)
eventRouter.post("/",postEventController)
eventRouter.post("/partiallyjoined/:Id",joinIntoTheEventPartiallyController)
eventRouter.patch("/join/:Id",joinUserIntoTheEventController)

module.exports = {eventRouter}