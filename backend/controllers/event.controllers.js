const { EventModel, AppliedEventModel } = require("../model/eventModels")


/**
 * This controller will give you the all the available Events.
 */
const getEventController = async (req, res) => {
    try {
        let data = await EventModel.find();
        res.status(200).json({ message: "success", data })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}

/**
 * This controller is using for craete the new events.
 */
const postEventController = async (req, res) => {
    console.log(req.headers.userId)
    try {
        let newEvent = new EventModel({ ...req.body, ownerID: req.headers.userId });
        await newEvent.save();
        res.status(200).json({ message: "success" })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}

/**
 * This controller is uning for join the user in the event
 */

const joinIntoTheEventPartiallyController = async (req, res) => {

    let appliedEventObject = {
        eventID: req.params.Id,
        userID: req.headers.userId
    }
    console.log('appliedEventObject:', appliedEventObject)

    try {
        let PartiallyJoinedEvent = new AppliedEventModel(appliedEventObject);
        await PartiallyJoinedEvent.save();
        res.status(200).json({ message: "success" })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}


/**
 * This function is using for put the user into the event accepted array,
 * because previously the user who wanted to join the event whose request is till
 * pending so in  this controler we have to accept the request of the user.
 */

const joinUserIntoTheEventController = async (req, res) => {
    const {haveToAddIntoTheEvent,status} = req.body;
    console.log('status:', status)
    try {
        let event = await EventModel.findOne({_id:req.params.Id,ownerID:req.headers.userId})
        
        let appliedEvent = await AppliedEventModel.findOne({eventID:req.params.Id,userID:haveToAddIntoTheEvent})
        
        let val = event.accepted.map(ele=>ele!==haveToAddIntoTheEvent)
        if(status=="accepted") appliedEvent[0].status = "accepted"
        else appliedEvent[0].status = "rejected"
        
        console.log('val:', val)
        if(!val.length){
            event.accepted.push(haveToAddIntoTheEvent)
            await appliedEvent.save()
            await event.save()
            res.status(200).json({ message: "success" })
        }else{
            res.status(200).json({ message: "you are already in the event." }) 
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}

module.exports = { getEventController, postEventController, joinIntoTheEventPartiallyController, joinUserIntoTheEventController}