import {createLogger, format, transports, Logger} from "winston";
const { combine, timestamp, prettyPrint } = format;


const prodLogger = ():Logger => {
  return createLogger({
    level: 'info',
    format: combine(
      timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
      format.json(),
      prettyPrint()
    ),
    transports: [
      new transports.File({ filename: 'info.log' }),
    ],
  });
};

const devLogger = ():Logger => {
  return createLogger({
    level: 'debug',
    format: combine(
      timestamp({format:"YYYY-MM-DD  HH:mm:ss"}),
      format.json(),
      prettyPrint()
    ),
    transports: [
      new transports.File({ filename: 'info.log' }),
      new transports.Console(),
    ],
  });
};

export const logger = process.env.NODE_ENV === 'development'? devLogger() : prodLogger();

