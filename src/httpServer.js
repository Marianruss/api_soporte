const express = require("express")
const bodyParser = require("body-parser")
const uploader = require("./utils/multer")
const app = express()
const mongoose = require("mongoose")
const apiRouter = require("./routers/apiRouter")  
// const dotenv = require("dotenv")
const cors = require("cors")
const logger = require("./logger/logger")
const uploadRouter = require("./routers/uploadRouter")
// dotenv.config()
const now = new Date().toLocaleString()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));

//Run app
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`)
    logger.info(`[${now}]       Se conectó a la base de datos el usuario ${"tas"}`)
})

const mongoConnect = `mongodb+srv://marianruss:Darksouls3@cluster0.n9qkduy.mongodb.net/support`

mongoose.connect(mongoConnect)
    .catch( err => {
        if (err){
            console.log("Can't connect to DB", err)
        } 
    }
)

//Routers
app.use("/api",apiRouter())
app.use("/files",uploadRouter())



