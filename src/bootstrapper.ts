import path from 'path';
import express, { Application } from 'express';

type PortType = {
  port: string | number;
};
class ExpressApplication {
  private app: Application;
  constructor(private port: PortType, private middlewares: any[], private controllers: any[]) {
    this.app = express();
    this.port = port;

    // __init__
    this.setupMiddlewares(middlewares);
  }
  private setupMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }
}

export default ExpressApplication;
