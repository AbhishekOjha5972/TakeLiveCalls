const express = require('express')
const {
    getEventController,
    postEventController,
    joinIntoTheEventPartiallyController,
    joinUserIntoTheEventController,
    getOptions,
    getSpecificEventController,
    getUsersAllEventController,
    getPendingRequestsAppliedEventController,
    getPendingRequestsOfLoggedInUserEventController
} = require('../controllers/event.controllers')


const eventRouter = express.Router()

eventRouter.get("/", getEventController)
eventRouter.get("/options", getOptions)
eventRouter.get("/created-by-user", getUsersAllEventController)
eventRouter.get("/pending-requests/:Id", getPendingRequestsAppliedEventController)
eventRouter.get("/pending-events-of-loggedin-user",getPendingRequestsOfLoggedInUserEventController)
eventRouter.get("/:Id", getSpecificEventController)
eventRouter.post("/", postEventController)
eventRouter.post("/partiallyjoined/:Id", joinIntoTheEventPartiallyController)
eventRouter.patch("/join/:Id", joinUserIntoTheEventController)


module.exports = { eventRouter }