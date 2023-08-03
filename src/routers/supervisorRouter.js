const { Router } = require("express")
const supervisorModel = require("../models/supervisor.model")
const logger = require("../logger/logger")
const now = new Date().toLocaleString()


const supervisorRouter = Router()

const supervisorRouterFn = () => {

    supervisorRouter.get("/:section/:type", async (req, res) => {

        let obj = [];
        const section = req.params.section;
        const type = req.params.type;

        try {
            const data = JSON.parse(JSON.stringify(await supervisorModel.findOne({ section: section, type: type })));
            if (!data) {
                throw new Error(`No existe el documento solicitado`);
            }
            const instr = data.instrucciones;
            const imgs = data.images;

            for (let i = 0; i < instr.length; i++) {
                obj.push({ step: instr[i], img: imgs[i] });
            }

            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} la sección ${section} y el tipo de consulta fue ${type}`);
            return res.status(200).json(obj);

        } catch (err) {
            logger.error(`[${now}]      La consulta no pudo ser completada, ${err}`);
            return res.status(404).json({
                msg: `${err}`
            });
        }
    })

    return supervisorRouter;
}


module.exports = supervisorRouterFn;