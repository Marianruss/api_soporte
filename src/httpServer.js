const express = require("express")
const app = express()
const mongoose = require("mongoose")
const supervisorRouter = require("./routers/supervisorRouter")  
const dotenv = require("dotenv")
const logger = require("./logger/logger")
dotenv.config()
const now = new Date().toLocaleString()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Run app
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`)
    logger.info(`[${now}]       Se conectó a la base de datos el usuario ${"tas"}`)
})

const mongoConnect = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.n9qkduy.mongodb.net/support`

mongoose.connect(mongoConnect)
    .catch( err => {
        if (err){
            console.log("Can't connect to DB", err)
        } 
    }
)

//Routers
app.use("/supervisor",supervisorRouter())
