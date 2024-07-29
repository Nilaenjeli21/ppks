import { Controller, ClassErrorMiddleware, Get } from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { ApplogService } from '../services/ApplogService';
import { OK } from 'http-status-codes';

@Controller('api/applogs')
@ClassErrorMiddleware(globalErrorHandler)
export class ApplogController {
  @Get('')
  private async getAllApplogs(req: Request, res: Response, next: NextFunction) {
    try {
      const applog = await ApplogService.getAllApplogs(req.query);

      return res.status(OK).json(applog);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
