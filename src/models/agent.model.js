const mongoose = require("mongoose")

const agentSchema = mongoose.Schema({
    section:String,
    type:String,
    instrucciones:Array,
    images: Array
})

const agentModel = mongoose.model("agent", agentSchema, "agent")


module.exports = agentModel