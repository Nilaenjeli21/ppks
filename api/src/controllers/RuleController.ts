import {
  Controller,
  ClassErrorMiddleware,
  Get,
  Middleware,
  Post,
  ClassMiddleware,
  Delete,
} from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { RuleService } from '../services/RuleService';
import { OK } from 'http-status-codes';
import { validate } from '../common/middleware/ValidationHandler';
import { Authentication } from '../common/config/Passport';

@Controller('api/rules')
@ClassErrorMiddleware(globalErrorHandler)
export class RuleController {
  @Get('')
  private async getAllRules(req: Request, res: Response, next: NextFunction) {
    try {
      const rule = await RuleService.getAllRules(req.query);

      return res.status(OK).json(rule);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Post('')
  @Middleware([validate(['link', 'originalName'])])
  @Middleware([Authentication.AUTHENTICATED])
  private async createRule(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await RuleService.createRule(req.body);
      res.status(201).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Delete(':id')
  @Middleware([Authentication.AUTHENTICATED])
  private async deleteRule(req: Request, res: Response, next: NextFunction) {
    try {
      const rule = await RuleService.deleteRule(+req.params.id);
      res.status(200).json(rule);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
