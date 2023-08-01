const { Router } = require("express")
const supervisorModel = require("../models/supervisor.model")


const supervisorRouter = Router()

const supervisorRouterFn = () => {

    supervisorRouter.get("/:section/:type", async (req, res) => {
        let obj = []
        const section = req.params.section
        const type = req.params.type

        const data = JSON.parse(JSON.stringify(await supervisorModel.findOne({ section: section, type: type })))
        // dataParse = data))
        const instr =  data.instrucciones
        const imgs =  data.images

        for (let i = 0; i < instr.length; i++) {
            obj.push({step:instr[i],img:imgs[i]})
        }


        return res.status(200).json(obj)
    })

    return supervisorRouter
}


module.exports = supervisorRouterFn