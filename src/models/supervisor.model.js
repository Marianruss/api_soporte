const mongoose = require("mongoose")

const supervisorSchema = mongoose.Schema({
    section:String,
    type:String,
    instrucciones:Array
})

const supervisorModel = mongoose.model("supervisor", supervisorSchema, "supervisor")


module.exports = supervisorModel