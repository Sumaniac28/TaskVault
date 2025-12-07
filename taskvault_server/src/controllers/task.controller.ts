import { Request, Response } from "express";
import AppDataSource from "@/config/supabase";
import { Task } from "@/entities/task.entity";
import { ITaskQuery } from "@/types";
import { emitToUser } from "@/socket/socket";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const taskRepo = AppDataSource.getRepository(Task);

    const task = taskRepo.create({
      ...req.body,
      userId,
    });

    await taskRepo.save(task);

    emitToUser(userId, 'task:created', task);

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create task",
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
    }: ITaskQuery = req.query;

    const taskRepo = AppDataSource.getRepository(Task);

    const queryBuilder = taskRepo
      .createQueryBuilder("task")
      .where("task.userId = :userId", { userId });

    if (status) {
      queryBuilder.andWhere("task.status = :status", { status });
    }

    if (priority) {
      queryBuilder.andWhere("task.priority = :priority", { priority });
    }

    if (search) {
      queryBuilder.andWhere("task.title ILIKE :search", {
        search: `%${search}%`,
      });
    }

    const [tasks, total] = await queryBuilder
      .orderBy("task.createdAt", "DESC")
      .skip((Number(page) - 1) * Number(limit))
      .take(Number(limit))
      .getManyAndCount();

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch tasks",
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    taskRepo.merge(task, req.body);
    await taskRepo.save(task);

    emitToUser(userId, 'task:updated', task);

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    await taskRepo.remove(task);

    emitToUser(userId, 'task:deleted', { id });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete task",
    });
  }
};
