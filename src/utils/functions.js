
const supervisorModel = require("../models/supervisor.model")
const agentModel = require("../models/agent.model")


parseData = (data) => {
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

getModel = (entity) => {
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


uploadImg = async (img) => {
    // Begin file upload
    console.log("Uploading file to Imgur..");
    const formData = new FormData()
    formData.append("image", img)

    const apiUrl = 'https://api.imgur.com/3/image';
    const apiToken = "779ad106e97aa48";

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${apiToken}`,
                Cookie: 'IMGURSESSION=014a59b6eef158587ecece1fe9997e33; _nc=1'
            },
            body: {image:img},
        })
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
    

}

module.exports = getModel,uploadImg,parseData