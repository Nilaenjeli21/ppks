import { Controller, Post, ClassErrorMiddleware, Get } from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { OK } from 'http-status-codes';
import { FileService } from '../services/FileService';

@Controller('api/file-upload')
@ClassErrorMiddleware(globalErrorHandler)
export class FileController {
  @Get('')
  private async getFile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query);
      const url = await FileService.getFile(req.query.filename as string);

      return res.status(OK).json({ data: url });
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Post('')
  private async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      await FileService.uploadSingleFile(req, res);
      return res.status(OK).json(req.file);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
