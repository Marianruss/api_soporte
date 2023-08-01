const express = require("express")
const app = express()
const mongoose = require("mongoose")
const supervisorRouter = require("./routers/supervisorRouter")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Run app
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`)
})

const mongoConnect = "mongodb+srv://marianruss:Darksouls3@cluster0.n9qkduy.mongodb.net/support"

mongoose.connect(mongoConnect)
    .catch( err => {
        if (err){
            console.log("Can't connect to DB", err)
        } 
    }
)

//Routers
app.use("/supervisor",supervisorRouter())
