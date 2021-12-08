import Pino from 'pino';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const logger = Pino({
  level: LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  },
});

export default logger;
