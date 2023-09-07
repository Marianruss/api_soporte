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

        console.log({ entity, section, type })
        const model = functions.getModel(entity)

        if (!model) {
            logger.error(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}/${section}/${type}" con resultado [No existe la entidad "${entity}"]         [/:entity/:section/:type] `);
            console.log("asdasd")
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })
        }


        try {
            const data = JSON.parse(JSON.stringify(await model.findOne({ section: section, type: type })));

            if (!data) {
                throw new Error(`No existe el documento solicitado`);
            }

            obj.push(data)

            obj = functions.parseData(obj)
            // test = {
            //     ...obj
            // }

            logger.info(`[${now}]        Se consultó desde la ip ${req.socket.remoteAddress} el modulo ${entity}, sección  ${section}>${type} con resultado ${JSON.stringify(obj)}         [/:entity/:section/:type] `);
            return res.status(200).json(obj);

        } catch (err) {
            logger.error(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe el documento con entity ${entity}, section ${section} y type ${type}]         [/:entity/:section/:type] `);
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
        const test = {}
        const model = functions.getModel(entity)

        if (!model) {
            console.log("sin model")
            logger.error(`[${now}]      Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe la entidad "${entity}"]        [/:entity/:section] `);
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })
        }

        try {
            const data = await model.paginate({ section: section }, { limit: 10 })

            console.log(data)

            if (data.docs.length === 0) {
                console.log("sin docs")
                logger.error(`[${now}]      Se consultó desde la ip ${req.socket.remoteAddress} la ruta "${entity}/${section}" con resultado [No hay documentos en la ruta ${entity}/${section}]        [/:entity/:section]`);
                throw new Error(`No existe la ruta ${entity}/${section}`)
            }   

            // console.log(data.docs[1].description)


            for (let i = 0; i < data.docs.length; i++) {
                const item = {
                    title: data.docs[i].title,
                    description: data.docs[i].description,
                    value: data.docs[i].type,
                    section: data.docs[i].section
                }
                // console.log(test)
                titles.push(item);
            }
            console.log(titles)

            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}/${section}" con resultado "[${JSON.stringify(titles)}]"        [/:entity/:section]`);
            return res.status(200).json(titles)
        }
        catch (err) {
            logger.info(`[${now}]      La consulta no pudo ser completada, ${err}`);
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
            logger.error(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No existe la entidad "${entity}"]        [/:entity]`);
            return res.status(404).json({
                msg: `no existe la entidad ${entity}`
            })

        }

        try {
            const data = await model.paginate({}, {})
            if (data.docs.length === 0) {
                logger.info(`[${now}]     Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No hay documentos en la entidad ${entity}]        [/:entity]  `);
                throw new Error("No hay docs")

            }

            console.log(data.docs)

            data.docs.forEach(item => {
                if (!sections.includes(item.section)) {
                    sections.push(item.section)
                }
            });

            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [${sections}]       [/:entity]`);
            return res.status(200).send(sections)
                
        
        }
        catch (err) {
            logger.info(`[${now}]       Se consultó desde la ip ${req.socket.remoteAddress} el modulo "${entity}" con resultado [No se encontraron documentos en la entidad ${entity}]        [/:entity]`);
            return res.status(404).json({ msg: `No se encontraron documentos en la entidad ${entity}` })
        }


    })

    return router;
}





module.exports = apiRouterFn;