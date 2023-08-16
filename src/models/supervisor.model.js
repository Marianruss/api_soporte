const mongoose = require("mongoose")
const paginate = require("mongoose-paginate-v2")

const supervisorSchema = mongoose.Schema({
    section:String,
    type:String,
    instrucciones:Array,
    images: Array,
    title:String
})


supervisorSchema.plugin(paginate)
const supervisorModel = mongoose.model("supervisor", supervisorSchema, "supervisor")


module.exports = supervisorModel