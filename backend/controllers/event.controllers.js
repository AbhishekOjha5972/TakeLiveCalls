const { EventModel, AppliedEventModel } = require("../model/eventModels")


/**
 * This controller will give you the all the available Events.
 */
const getEventController = async (req, res) => {
    // Destructure the query parameters from the request
    const { state, country, q, limit } = req.query;
    const text = req.query.q || "";

    // Initialize an empty object to hold the filters
    const filters = {};

    // Apply the state filter if provided
    if (state) {
        filters.state = state;
    }

    // Apply the limit filter if provided
    if (limit) {
        filters.limit = limit;
    }

    // Apply the country filter if provided
    if (country) {
        filters.country = country;
    }

    // Apply the text search filter if provided
    if (q) {
        filters.$or = [
            { nameOfEvent: { $regex: text, $options: "i" } },
            { shortDescription: { $regex: text, $options: "i" } }
        ];
    }

    try {
        // Retrieve events from the EventModel collection based on the filters
        let data = await EventModel.find(filters)
            .populate({
                path: "accepted",
                select: "-password"
            }).exec();

        // Send a successful response with the retrieved data
        res.status(200).json({ message: "success", data });
    }
    catch (err) {
        // Send a 500 Internal Server Error response if an error occurs
        res.status(500).json({ message: "something went wrong", error: err.message });
    }
}



const getSpecificEventController = async (req, res) => {
    try {
        let event = await EventModel.findById(req.params.Id).populate("ownerID", "-password").populate("accepted", "-password").exec()
        res.status(200).json({ message: "success", data: event })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}


const getUsersAllEventController = async (req, res) => {

    try {
        let event = await EventModel.find({ ownerID: req.headers.userId })
        res.status(200).json({ message: "success", data: event })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}

const getPendingRequestsAppliedEventController = async (req, res) => {
    try {
        let event = await AppliedEventModel.find({ eventID: req.params.Id,status:"pending" }).populate("userID", "-password")
        res.status(200).json({ message: "success", data: event })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}


const getPendingRequestsOfLoggedInUserEventController = async (req, res) => {
    try {
        let event = await AppliedEventModel.find({ userID: req.headers.userId}).populate("userID", "-password").populate("eventID")
        res.status(200).json({ message: "success", data: event })
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
    try {
        let check = await AppliedEventModel.find(appliedEventObject)
        if (!check.length) {
            let PartiallyJoinedEvent = new AppliedEventModel(appliedEventObject);
            await PartiallyJoinedEvent.save();
            res.status(200).json({ message: "success" })
        }
        else {
            res.status(200).json({ message: "you already applied for this event." })
        }
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
    const { haveToAddIntoTheEvent, status } = req.body;
    try {
        let event = await EventModel.findOne({ _id: req.params.Id, ownerID: req.headers.userId })

        let appliedEvent = await AppliedEventModel.findOne({ eventID: req.params.Id, userID: haveToAddIntoTheEvent })
        if (appliedEvent) {
            let val = event.accepted.filter(ele => ele == haveToAddIntoTheEvent)
            if (status == "accepted") appliedEvent.status = "accepted"
            else appliedEvent.status = "rejected"

            if (!val.length) {
                if (status == "accepted") {
                    event.accepted.push(haveToAddIntoTheEvent)
                }
                await appliedEvent.save()
                await event.save()
                res.status(200).json({ message: "success" })
            } else {
                res.status(200).json({ message: "you are already in the event." })
            }
        }
        else {
            res.status(200).json({ message: "you didn't apply any event yet please enrolled first." })
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
}

/**
 * GET ALL THE FILTER OPTIONS DYNAMICALLY FOR COUNTRIES & STATES
 * */
const getOptions = async (req, res) => {
    try {
        // Retrieve a list of unique countries from the EventModel collection
        const countries = await EventModel.aggregate([{ $group: { _id: null, countries: { $addToSet: '$country' } } }]);
        
        // Retrieve a list of unique states from the EventModel collection
        const states = await EventModel.aggregate([{ $group: { _id: null, states: { $addToSet: '$state' } } }]);
        
        // Send a successful response with the retrieved countries and states
        res.status(200).send({ message: 'success', data: { countries: countries[0].countries, states: states[0].states } });
    } catch (error) {
        // Log the error and send a 500 Internal Server Error response
        console.log('error:', error);
        res.status(500).send({
            message: "Internal server error!",
            error: error.message
        });
    }
}





module.exports = {
    getUsersAllEventController,
    getSpecificEventController,
    getOptions,
    getEventController,
    postEventController,
    joinIntoTheEventPartiallyController,
    joinUserIntoTheEventController,
    getPendingRequestsAppliedEventController,
    getPendingRequestsOfLoggedInUserEventController
} 