const { EventModel, AppliedEventModel } = require("../model/eventModels")


/**
 * This controller will give you the all the available Events.
 */
const getEventController = async (req, res) => {
    const { state, country, q, limit } = req.query
    const text = req.query.q || ""

    console.log('text:', text)
    const filters = {};

    if (state) {
        filters.state = state;
    }
    if (limit) {
        filters.limit = limit;
    }

    if (country) {
        filters.country = country;
    }

    if (q) {
        filters.$or = [
            { nameOfEvent: { $regex: text, $options: "i" } },
            { shortDescription: { $regex: text, $options: "i" } }
        ];
    }
    try {
        let data = await EventModel.find(filters)
            .populate({
                path: "accepted",
                select: "-password"
            }).exec();

        res.status(200).json({ message: "success", data })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
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
    console.log('res:', res)
    try {
        let event = await EventModel.find({})
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
    const { haveToAddIntoTheEvent, status } = req.body;
    try {
        let event = await EventModel.findOne({ _id: req.params.Id, ownerID: req.headers.userId })

        let appliedEvent = await AppliedEventModel.findOne({ eventID: req.params.Id, userID: haveToAddIntoTheEvent })
        if (appliedEvent) {
            let val = event.accepted.filter(ele => ele == haveToAddIntoTheEvent)
            if (status == "accepted") appliedEvent.status = "accepted"
            else appliedEvent.status = "rejected"

            if (!val.length) {
                event.accepted.push(haveToAddIntoTheEvent)
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
        const countries = await EventModel.aggregate([{ $group: { _id: null, countries: { $addToSet: '$country' } } }]);
        const states = await EventModel.aggregate([{ $group: { _id: null, states: { $addToSet: '$state' } } }]);
        res.status(200).send({ message: 'success', data: { countries: countries[0].countries, states: states[0].states } });
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({
            message: "Internal serr error!",
            error: error.message
        });
    }
}




module.exports = { getUsersAllEventController, getSpecificEventController, getOptions, getEventController, postEventController, joinIntoTheEventPartiallyController, joinUserIntoTheEventController } 