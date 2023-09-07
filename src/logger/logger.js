const { createLogger, format, transports } = require("winston")
const now = new Date().toLocaleString()


const logger = createLogger({
    level: "LOG",
    format: format.combine(
        format.simple()
    ),
    transports: [
        // new winston.transports.File({filename:"../logs/error.log",level:"error"}),
        new (transports.Console)({ 'timestamp': true }),
        new transports.File({ filename: "../logs/info.log", level: "info", maxSize:"20kb" })
    ],
    colorize: true
})
module.exports = logger