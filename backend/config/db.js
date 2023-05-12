const mongoose  = require("mongoose")
require("dotenv").config();


let takeLiveCallsDB =  mongoose.connect(process.env.TakeLiveCallsURL)

module.exports = {takeLiveCallsDB}