import { User, UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import DuplicateError from '../common/errors/DuplicateError';
import argon2 from 'argon2';
import InvalidPasswordError from '../common/errors/InvalidPasswordError';
import { UserParamsQuery } from '../common/constants/paramsQuery';


export const UserService = {
  getAllUsers: async (params: UserParamsQuery): Promise<{ rows: User[]; count: number }> => {
    const { rows, count } = await UserModel.getAll(params);
    return { rows, count };
  },
  hashPassword: async (password: string): Promise<string> => {
    return await argon2.hash(password);
  },
  verifyUserPassword: async (user: User, password: string): Promise<boolean> => {
    return await argon2.verify(user.password, password);
  },
  generateUserJwt: (userId: number, jwtid: string): string => {
    const body = { id: userId };
    return jwt.sign(body, process.env.APP_SECRET, { jwtid });
  },
  verifyUserJwt: (token: string): number => {
    const { id } = jwt.verify(token, process.env.APP_SECRET) as { id: number };
    return id;
  },
  getUserById: async (id: number): Promise<User> => {
    return await UserModel.getById(id);
  },
  loginUser: async (email: string, password: string): Promise<User> => {
    const user = await UserModel.getByEmail(email);
    if (!user || !(await UserService.verifyUserPassword(user, password))) {
      throw new InvalidPasswordError();
    }
    return user;
  },
  isUserExistsByEmail: async (email: string, notId?: number): Promise<boolean> => {
    const check = await UserModel.countByEmail(email, notId);
    return check > 0;
  },
  createUser: async (userData: User): Promise<User> => {
    const existingUser = await UserService.isUserExistsByEmail(userData.email);

    if (existingUser) {
      throw new DuplicateError(`Email: ${userData.email}`);
    }
    try {
      userData.password = await UserService.hashPassword(userData.password);
      const { password, name, email } = userData;

      return await UserModel.createUser({ password, name, email, role: UserRole.ADMIN });
    } catch (e) {
      throw e;
    }
  },

  updateUser: async (id: number, data: User): Promise<User> => {
    const user = await UserModel.getById(id);
    const existingUser = await UserService.isUserExistsByEmail(data.email, id);

    if (user.email !== data.email && existingUser) {
      throw new DuplicateError(`Email: ${data.email}`);
    }

    try {
      return await UserModel.update(id, data);
    } catch (e) {
      throw e;
    }
  },
  updatePasswordUser: async (
    id: number,
    { password, currentPassword }: { password: string; currentPassword: string }
  ): Promise<User> => {
    const user = await UserModel.getById(id);

    if (!user || !(await UserService.verifyUserPassword(user, currentPassword))) {
      throw new InvalidPasswordError();
    }

    try {
      password = await UserService.hashPassword(password);
      return await UserModel.update(id, { password });
    } catch (e) {
      throw e;
    }
  },
};
