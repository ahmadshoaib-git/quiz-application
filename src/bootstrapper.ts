import path from 'path';
import express, { Application } from 'express';
import morgan from 'morgan';
import logger from './lib/logger';

type PortType = string | number;
class ExpressApplication {
  private app: Application;

  constructor(private port: PortType, private middlewares: any[], private controllers: any[]) {
    this.app = express();
    this.port = port;

    // __init__
    this.setupMiddlewares(middlewares);
    this.configureAssets();
    this.setupLogger();
  }
  private setupMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }
  private setupLogger() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }
  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`Application is running on ${this.port}`);
    });
  }
}

export default ExpressApplication;
