import {
  Controller,
  ClassErrorMiddleware,
  Get,
  Middleware,
  Post,
  ClassMiddleware,
  Delete,
  Put,
} from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { ProofService } from '../services/ProofService';
import { OK } from 'http-status-codes';
import { validate } from '../common/middleware/ValidationHandler';
import { Authentication } from '../common/config/Passport';
import { User } from '@prisma/client';
import { ApplogService } from '../services/ApplogService';

@Controller('api/proofs')
@ClassMiddleware(Authentication.AUTHENTICATED)
@ClassErrorMiddleware(globalErrorHandler)
export class ProofController {
  @Get('')
  private async getAllProofs(req: Request, res: Response, next: NextFunction) {
    try {
      const proof = await ProofService.getAllProofs(req.query);

      return res.status(OK).json(proof);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Post('')
  @Middleware([validate(['ComplaintId', 'link', 'chronology'])])
  private async createProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const proof = await ProofService.createProof(req.body);

      await ApplogService.createApplog({
        message: `Memberikan Bukti Pengaduan untuk Pengaduan #${proof.Complaint.id} `,
        UserId: id,
      });
      res.status(201).json(proof);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Put(':id')
  @Middleware([Authentication.AUTHENTICATED])
  private async confirmProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const proof = await ProofService.updateProof(+req.params.id, req.body);

      await ApplogService.createApplog({
        message: `Ubah Bukti ${proof.id}`,
        UserId: id,
      });
      return res.status(OK).json(proof);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Delete(':id')
  @Middleware([Authentication.AUTHENTICATED])
  private async deleteProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      await ApplogService.createApplog({ message: 'Hapus Bukti Pengaduan', UserId: id });

      const proof = await ProofService.deleteProof(+req.params.id);
      return res.status(OK).json(proof);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}