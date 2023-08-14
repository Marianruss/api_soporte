const { Router } = require("express")
const supervisorModel = require("../models/supervisor.model")
const agentModel = require("../models/agent.model")
const logger = require("../logger/logger")
const now = new Date().toLocaleString()


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
            const instr = data.instrucciones;
            const imgs = data.images;

            for (let i = 0; i < instr.length; i++) {
                obj.push({ step: instr[i], img: imgs[i] });
            }

            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo ${entity}, la sección ${section} y el tipo de consulta fue ${type}`);
            return res.status(200).json(obj);

        } catch (err) {
            logger.error(`[${now}]      La consulta no pudo ser completada, ${err}`);
            return res.status(404).json({
                msg: `${err}`
            });
        }
    })

    return router;
}


module.exports = apiRouterFn;