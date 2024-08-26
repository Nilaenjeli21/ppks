import {
  Controller,
  Post,
  ClassErrorMiddleware,
  Middleware,
  Get,
  Delete,
  Put,
  ClassMiddleware,
} from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { validate } from '../common/middleware/ValidationHandler';
import { ComplaintService } from '../services/ComplaintService';
import { OK } from 'http-status-codes';
import { Authentication } from '../common/config/Passport';
import { ApplogService } from '../services/ApplogService';
import { User } from '@prisma/client';

@Controller('api/complaints')
@ClassErrorMiddleware(globalErrorHandler)
export class ComplaintController {
  @Post('')
  @Middleware([
    validate(['name', 'major', 'program', 'position', 'reporter', 'description', 'contact', 'reportDate', 'email', 'perpetrator', 'incidentDate', 'incidentLocation']),
  ])
  private async createComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await ComplaintService.createComplaint(req.body);
      res.status(201).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Get('')
  @Middleware([Authentication.AUTHENTICATED])
  private async getAllComplaints(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await ComplaintService.getAllComplaints(req.query);

      return res.status(OK).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Get('status-count')
  private async countAllComplaintbyStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const complaint = await ComplaintService.countAllComplaintbyStatus();
      return res.status(OK).json({ data: complaint });
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Delete(':id')
  @Middleware([Authentication.AUTHENTICATED])
  private async deleteComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      await ApplogService.createApplog({ message: 'Hapus Pengaduan', UserId: id });

      const complaint = await ComplaintService.deleteComplaint(+req.params.id);
      return res.status(OK).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Put(':id/confirm')
  @Middleware([Authentication.AUTHENTICATED])
  private async confirmComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const complaint = await ComplaintService.confirmComplaint(+req.params.id);

      await ApplogService.createApplog({
        message: `Menerima Pengaduan Dari ${complaint.name}`,
        UserId: id,
      });
      return res.status(OK).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Put(':id/reject')
  @Middleware([Authentication.AUTHENTICATED])
  private async rejectComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const complaint = await ComplaintService.rejectComplaint(+req.params.id);

      await ApplogService.createApplog({
        message: `Membatalkan Pengaduan Dari ${complaint.name} (Pengaduan Tidak Valid)`,
        UserId: id,
      });

      return res.status(OK).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Put(':id/close')
  @Middleware([Authentication.AUTHENTICATED])
  private async closeComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const complaint = await ComplaintService.closeComplaint(+req.params.id, req.body);

      await ApplogService.createApplog({
        message: `Memberikan Rekomendasi Pengaduan Dari ${complaint.name} `,
        UserId: id,
      });
      return res.status(OK).json(complaint);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
