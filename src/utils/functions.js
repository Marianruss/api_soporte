
function parseData(data) {
    const obj = []
    // console.log(data)
    data.forEach(item => {
        const instr = item.instrucciones;
        const imgs = item.images;
        const parsedData = []
        // console.log({instr,imgs})

        for (let i = 0; i < instr.length; i++) {
            parsedData.push({ step: instr[i], img: imgs[i] });
        }
        obj.push(parsedData)
    });

    console.log(obj)

    return obj

}

module.exports = parseData