const { Router } = require("express")
const supervisorModel = require("../models/supervisor.model")
const agentModel = require("../models/agent.model")
const logger = require("../logger/logger")
const { model } = require("mongoose")
const now = new Date().toLocaleString()
// import { parse } from "path"
const parseData = require("../utils/functions")


const router = Router()

const apiRouterFn = () => {

    router.get("/:entity/:section/:type", async (req, res) => {

        // console.log(entity)
        let obj = [];
        const entity = req.params.entity
        const section = req.params.section;
        const type = req.params.type;
        var model

        console.log(entity)

        switch (entity) {
            case "agent":
                model = agentModel
                break;
            case "supervisor":
                model = supervisorModel
                break;
            case "admin":
                model = adminModel
                break;
        }

        try {
            const data = JSON.parse(JSON.stringify(await model.findOne({ section: section, type: type })));
            if (!data) {
                throw new Error(`No existe el documento solicitado`);
            }
            obj.push(data)

            obj = parseData(obj)

            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo ${entity}, la sección ${section} y el tipo de consulta fue ${type}`);
            return res.status(200).json(obj);

        } catch (err) {
            logger.error(`[${now}]      La consulta no pudo ser completada, ${err}`);
            return res.status(404).json({
                msg: `${err}`
            });
        }
    })


    router.get("/:entity", async (req, res) => {
        const entity = req.params.entity
        var dataParsed = []
        const titles = []
        var model

        switch (entity) {
            case "agent":
                model = agentModel
                break;
            case "supervisor":
                model = supervisorModel
                break;
            case "admin":
                model = adminModel
                break;
        }

        if (!model) {
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })
        }

        try {
            const data = await model.paginate({}, { limit: 10 })

            for (let i = 0; i < data.docs.length; i++) {
                const title = data.docs[i].title;
                titles.push(title);
            }   

            return res.status(200).json(titles)
        }
        catch (err) {
            return res.status(404).json({
                msg: err
            })
        }

    })

    return router;
}





module.exports = apiRouterFn;