import {
  Controller,
  ClassErrorMiddleware,
  Get,
  Middleware,
  Post,
  ClassMiddleware,
} from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { RecommendationService } from '../services/RecommendationService';
import { OK } from 'http-status-codes';
import { validate } from '../common/middleware/ValidationHandler';
import { Authentication } from '../common/config/Passport';

@Controller('api/recommendations')
@ClassMiddleware(Authentication.AUTHENTICATED)
@ClassErrorMiddleware(globalErrorHandler)
export class RecommendationController {
  @Get('')
  private async getAllRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const recommendation = await RecommendationService.getAllRecommendations(req.query);

      return res.status(OK).json(recommendation);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Post('')
  @Middleware([validate(['ComplaintId', 'link'])])
  private async createRecommendation(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await RecommendationService.createRecommendation(req.body);
      res.status(201).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
