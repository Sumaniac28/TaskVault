import validator from 'validator';
import { ICreateTask, IUpdateTask } from '@/types';

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateTaskTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.length <= 200;
};

export const validateTaskStatus = (status: string): boolean => {
  return ['todo', 'inprogress', 'done'].includes(status);
};

export const validateTaskPriority = (priority: string): boolean => {
  return ['low', 'medium', 'high'].includes(priority);
};

export const validateCreateTask = (data: ICreateTask): string[] => {
  const errors: string[] = [];

  if (!data.title || !validateTaskTitle(data.title)) {
    errors.push('Title is required and must be between 1-200 characters');
  }

  if (data.status && !validateTaskStatus(data.status)) {
    errors.push('Status must be todo, inprogress, or done');
  }

  if (data.priority && !validateTaskPriority(data.priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.push('Due date cannot be in the past');
  }

  return errors;
};

export const validateUpdateTask = (data: IUpdateTask): string[] => {
  const errors: string[] = [];

  if (data.title !== undefined && !validateTaskTitle(data.title)) {
    errors.push('Title must be between 1-200 characters');
  }

  if (data.status && !validateTaskStatus(data.status)) {
    errors.push('Status must be todo, inprogress, or done');
  }

  if (data.priority && !validateTaskPriority(data.priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.push('Due date cannot be in the past');
  }

  return errors;
};
