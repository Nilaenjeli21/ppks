import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import httpContext from 'express-http-context';
import * as controllers from './controllers';
import logger from './common/config/logger';
import morgan from './common/config/morgan';
import { Application } from 'express';
import passport from 'passport';
import configurePassport from './common/config/Passport';

class RouterServer extends Server {
  public router: Application;

  public constructor() {
    super(true);
    this.router = this.app;
    this.configureMiddlewares();
    this.setupControllers();
  }

  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      const controller = (controllers as any)[name];
      if (typeof controller === 'function') {
        controllerInstances.push(new controller());
      }
    }
    super.addControllers(controllerInstances);
  }

  private async configureMiddlewares(): Promise<void> {
    const corsOptions: CorsOptions = {
      origin: ['http://localhost:5000', 'http://127`.0.0.1:5000'],
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(httpContext.middleware);
    configurePassport();
    this.app.use(passport.initialize());
    // this.app.use(morgan);
  }

  public start(port?: number): void {
    this.app.listen(port, () => {
      logger.info('Server started on port: ' + port);
    });
  }
}

export default RouterServer;
