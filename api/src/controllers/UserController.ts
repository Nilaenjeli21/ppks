import { Controller, Post, ClassErrorMiddleware, Middleware, Get, Put } from '@overnightjs/core';
import logger from '../common/config/logger';
import { NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../common/errors/globalErrorHandler';
import { validate } from '../common/middleware/ValidationHandler';
import { UserService } from '../services/UserService';
import { uuid } from 'uuidv4';
import { Authentication } from '../common/config/Passport';
import { User } from '@prisma/client';
import { OK } from 'http-status-codes';
import { ApplogService } from '../services/ApplogService';

@Controller('api/users')
@ClassErrorMiddleware(globalErrorHandler)
export class UserController {
  @Get('current')
  private async getUserLogin(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')?.[1];
    if (!token) return res.sendStatus(401);

    try {
      const id = UserService.verifyUserJwt(token);
      const user = await UserService.getUserById(id);
      delete user.password;
      return res.json(user);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Post('login')
  @Middleware([validate(['email', 'password'])])
  private async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const login = await UserService.loginUser(req.body.email, req.body.password);
      delete login.password;

      const sessionId = UserService.generateUserJwt(login.id, uuid());

      return res.status(201).json({
        token: UserService.generateUserJwt(login.id, sessionId),
        user: login,
      });
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Post('')
  @Middleware([validate(['email', 'name', 'password'])])
  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }

  @Put(':id')
  @Middleware([validate(['email', 'name', 'phone'])])
  @Middleware([Authentication.AUTHENTICATED])
  private async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.updateUser(+req.params.id, req.body);
      res.status(201).json(user);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  @Get('')
  private async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers(req.query);
      return res.status(OK).json(users);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
  

  @Put(':id/password')
  @Middleware([validate(['password', 'currentPassword'])])
  @Middleware([Authentication.AUTHENTICATED])
  private async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as User;
      const { currentPassword, password } = req.body;
      const editedUser = await UserService.updatePasswordUser(+req.params.id, {
        currentPassword,
        password,
      });

      await ApplogService.createApplog({
        message: `Admin ${editedUser.name} Mengubah Password`,
        UserId: id,
      });

      return res.status(OK).json(editedUser);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  }
}
