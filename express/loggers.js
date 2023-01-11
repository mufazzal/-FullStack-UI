const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

const requestLogger = winston.createLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.File({
      filename: './logs/logs.json', //process.env.logDir,
      level: 'debug'
    })
  ]
})

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: 'info',
      colorize: true,
      timestamp: function () {
          return (new Date()).toLocaleTimeString();
      },
      prettyPrint: true
    })
  ]
})

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
});

module.exports = {logger, requestLogger}