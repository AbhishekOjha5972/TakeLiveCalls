const express = require("express")
const { takeLiveCallsDB } = require("./config/db")
const { userRouter } = require("./routes/userRoutes")
const { eventRouter } = require("./routes/eventRoutes")
const tokenValidator = require("./middlewares/tokenValidator")
const cors = require("cors")
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())


app.use("/users",userRouter)
app.use(tokenValidator)
app.use("/events",eventRouter)

app.all('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(process.env.port, async () => {
    try {
        await takeLiveCallsDB
        console.log("Your app is now connected with local system ✅")
    } catch (err) {
        console.log(err.message)
    }
})