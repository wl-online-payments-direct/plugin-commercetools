import winston from 'winston';

class Logger {
  public logger: winston.Logger;

  private consoleLog: boolean;

  private errorLog: boolean;

  private errorLogFilePath: string;

  private allLog: boolean;

  private allLogFilePath: string;

  constructor() {
    this.consoleLog = process.env.LOG_TRANSPORTS?.includes('console') || false;
    this.errorLog = process.env.LOG_TRANSPORTS?.includes('error') || false;
    this.allLog = process.env.LOG_TRANSPORTS?.includes('all') || false;
    this.errorLogFilePath = process.env.LOG_ERROR_FILEPATH || 'logs/error.log';
    this.allLogFilePath = process.env.LOG_ALL_FILEPATH || 'logs/all.log';

    this.logger = winston.createLogger(this.getOptions());
  }

  private getOptions(): object {
    return {
      level: this.setLevel(),
      levels: this.setLevels(),
      format: this.setFormat(),
      transports: this.setTransports(),
    };
  }

  private setLevel() {
    return process.env.LOG_LEVEL || 'http';
  }

  private setLevels() {
    return {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };
  }

  private getColors() {
    return {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white',
    };
  }

  private setFormat() {
    winston.addColors(this.getColors());

    const timestampFormat =
      process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss:ms';

    const format = winston.format.combine(
      winston.format.timestamp({ format: timestampFormat }),

      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    );
    return format;
  }

  private setTransports() {
    const transports = [];

    if (this.errorLog) {
      transports.push(
        new winston.transports.File({
          filename: this.errorLogFilePath,
          level: 'error',
        }),
      );
    }

    if (this.allLog) {
      transports.push(
        new winston.transports.File({
          filename: this.allLogFilePath,
        }),
      );
    }

    // If no transports defined, it will console the logs
    if (this.consoleLog || !transports.length) {
      transports.push(
        new winston.transports.Console({
          format: winston.format.colorize({ all: true }),
        }),
      );
    }
    return transports;
  }

  public info(message: string, data?: unknown): void {
    this.logger.info(message, data);
  }

  public error(message: string, data?: unknown): void {
    this.logger.error(message, data);
  }

  public debug(message: string, data?: unknown): void {
    this.logger.debug(message, data);
  }

  public http(message: string, data?: unknown): void {
    this.logger.http(message, data);
  }

  public warn(message: string, data?: unknown): void {
    this.logger.warn(message, data);
  }
}

// Initialize an instance for singleton object
let instance: Logger;

const logger = () => {
  if (instance) {
    return instance;
  }
  instance = new Logger();
  return instance;
};

export { logger };
