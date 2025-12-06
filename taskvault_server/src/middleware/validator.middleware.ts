import { Request, Response, NextFunction } from 'express';
import {
  validateEmail,
  validatePassword,
  validateCreateTask,
  validateUpdateTask
} from '@/utils/validation.util';
import { IAuth, ICreateTask, IUpdateTask } from '@/types';

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IAuth = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'Valid email is required'
    });
  }

  if (!password || !validatePassword(password)) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters'
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IAuth = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  next();
};

export const validateCreateTaskReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: ICreateTask = req.body;
  const errors = validateCreateTask(data);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors[0]
    });
  }

  next();
};

export const validateUpdateTaskReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: IUpdateTask = req.body;
  const errors = validateUpdateTask(data);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors[0]
    });
  }

  next();
};
