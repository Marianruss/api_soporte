const { createLogger, format, transports } = require("winston")
const now = new Date().toLocaleString()
const moment = require("moment")

// const logFormat = winston.format.combine(
//     format.label({label: "test"}),
//     format.timestamp(),
//     "test"
// )

const logger = createLogger({
    level: "",
    format: format.combine(
        format.simple()
    ),
    transports: [
        // new winston.transports.File({filename:"../logs/error.log",level:"error"}),
        new (transports.Console)({ 'timestamp': true }),
        new transports.File({ filename: "../logs/info.log", level: "info" })
    ],
    colorize: true
})
module.exports = logger