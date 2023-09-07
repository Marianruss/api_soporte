
const supervisorModel = require("../models/supervisor.model")
const agentModel = require("../models/agent.model")


exports.parseData = (data) => {
    const obj = []
    let parsedData = []
    // console.log(data)
    data.forEach(item => {
        const instr = item.instrucciones;
        const imgs = item.images;
        
        // console.log({instr,imgs})

        for (let i = 0; i < instr.length; i++) {
            parsedData[i] = ({ step: instr[i], img: imgs[i], id:i+1});
        }
        obj.push(parsedData)
    });

    console.log(obj)

    return parsedData

}

exports.getModel = (entity) => {
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

    return model
}

// module.exports