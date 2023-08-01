const winston = require("winston")
const logger = winston.createLogger(logConfiguration)

const logConfiguration ={

    level:"info",
    transports: [
        new winston.transport.Console()
    ]

}

module.exports(log)