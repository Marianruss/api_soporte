const { Router } = require("express")
const logger = require("../logger/logger")
const { model } = require("mongoose")
const now = new Date().toLocaleString()
// import { parse } from "path"
const functions = require("../utils/functions")


const router = Router()

const apiRouterFn = () => {

    router.get("/:entity/:section/:type", async (req, res) => {


        let obj = [];
        const entity = req.params.entity
        const section = req.params.section;
        const type = req.params.type;

        console.log({entity,section,type})
        const model = functions.getModel(entity)

        try {
            const data = JSON.parse(JSON.stringify(await model.findOne({ section: section, type: type })));

            if (!data) {
                throw new Error(`No existe el documento solicitado`);
            }

            obj.push(data)

            obj = functions.parseData(obj)

            logger.info(`[${now}]       [/:entity/:section/:type]        Se consultó desde la ip ${req.socket.remoteAddress} el modulo ${entity}, sección  ${section}>${type} con resultado ${JSON.stringify(obj)}`);
            return res.status(200).json(obj);

        } catch (err) {
            logger.error(`[${now}]       [/:entity/:section/:type]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe el documento con entity ${entity}, section ${section} y type ${type}]`);
            return res.status(404).json({
                msg: `${err}`
            });
        }
    })


    router.get("/:entity/:section", async (req, res) => {
        const entity = req.params.entity
        const section = req.params.section
        var dataParsed = []
        const titles = []
        const model = functions.getModel(entity)

        if (!model) {
            logger.error(`[${now}]      [/:entity/:section]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe la entidad "${entity}"]`);
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })
        }

        try {
            const data = await model.paginate({ section: section }, { limit: 10 })

            if (data.docs.length === 0){
                logger.error(`[${now}]      [/:entity/:section]      Se consultó desde la ip ${req.socket.remoteAddress} la ruta ${entity}/${section} con resultado [No hay documentos en la ruta ${entity}/${section}]`);
                throw new Error(`No existe la ruta ${entity}/${section}`)
            }


            for (let i = 0; i < data.docs.length; i++) {
                const title = data.docs[i].title;
                titles.push(title);
            }

            logger.info(`[${now}]      [/:entity/:section]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo ${entity} con resultado [${titles}]`);
            return res.status(200).json(titles)
        }
        catch (err) {
            // logger.error(`[${now}]      La consulta no pudo ser completada, ${err}`);
            return res.status(404).json({
                msg: `\nNo existe la ruta ${entity}/${section}`
            })
        }

    })



    router.get("/:entity", async (req, res) => {
        const sections = []
        const entity = req.params.entity
        const data = {}
        const model = functions.getModel(entity)

        if (!model) {
            logger.error(`[${now}]      [/:entity]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe la entidad "${entity}"]`);
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })

        }

        try {
            const data = await model.paginate({}, {})
            if (data.docs.length === 0) {
                logger.info(`[${now}]      [/:entity]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No hay documentos en la entidad ${entity}]`);
                throw new Error("No hay docs")

            }

            console.log(data.docs)

            data.docs.forEach(item => {
                if (!sections.includes(item.section)) {
                    sections.push(item.section)
                }
            });


            return res.status(200).json({
                sections
            })
        }
        catch (err) {
            logger.info(`[${now}]      [/:entity]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No se encontraron documentos en la entidad ${entity}]`);
            return res.status(404).json({ msg: `No se encontraron documentos en la entidad ${entity}` })
        }


    })

    return router;
}





module.exports = apiRouterFn;