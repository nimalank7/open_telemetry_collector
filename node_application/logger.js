const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Send logs to the console
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/app.log' }),
  ],
});

module.exports = logger;