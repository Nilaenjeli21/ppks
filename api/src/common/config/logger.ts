import winston, { format } from 'winston';
import httpContext from 'express-http-context';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf((info) => {
  const message = `${info.timestamp} ${info.level} ${info.message}`;
  return message;
});

const customFormatPrisma = printf((info) => {
  const message = `${info.message}`;
  return message;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), customFormat),
  transports: [new winston.transports.Console()],
});

const accessLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), customFormat),
  transports: [new winston.transports.Console()],
});

export const prismaLogger = winston.createLogger({
  level: 'debug',
  format: combine(colorize(), customFormatPrisma),
  transports: [new winston.transports.Console()],
});

export default logger;

export class AccessLogStream {
  public write(message: string): void {
    accessLogger.log(process.env.ACCESS_LOG_LEVEL, message);
  }
}

// export const PrismaLogStream = {
//   write(message: string): void {
//     prismaLogger.log('info', message);
//   },
// };
