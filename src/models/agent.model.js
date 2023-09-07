const mongoose = require("mongoose")
const paginate = require("mongoose-paginate-v2")

const agentSchema = mongoose.Schema({
    section:String,
    type:String,
    instrucciones:Array,
    images: Array,
    title:String,
    description:String
})

agentSchema.plugin(paginate)
const agentModel = mongoose.model("agent", agentSchema, "agent")


module.exports = agentModel