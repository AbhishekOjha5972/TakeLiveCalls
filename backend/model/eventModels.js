const mongoose = require("mongoose")


/**
 * This schema will help for creating the events 
 */
const eventSchema = new mongoose.Schema({
    nameOfEvent: { type: String, required: true },
    shortDescription: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    limit: { type: Boolean, required: true },
    accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
}, { versionKey: false, timestamps: true })

/**
 * This schema will help us to take record of how many event in which one user applied.
 * and it will also show that what is the status of the event like [accepted,pending,rejected]
 */

const appliedEvents = new mongoose.Schema({
    eventID:
        { type: mongoose.Schema.Types.ObjectId, ref: "event" },
    userID:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    status:
        { type: String, enum: ["accepted", "pending", "rejected"] }
}, { versionKey: false, timestamps: true })



const EventModel = mongoose.model('event', eventSchema)
const AppliedEventModel = mongoose.model('appliedEvent', appliedEvents)

module.exports = { EventModel, AppliedEventModel }