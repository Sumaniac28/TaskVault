import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "@/controllers/task.controller";
import { authenticate } from "@/middleware/auth.middleware";
import {
  validateCreateTaskReq,
  validateUpdateTaskReq,
} from "@/middleware/validator.middleware";

const router = Router();

router.use(authenticate);

router.post("/", validateCreateTaskReq, createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", validateUpdateTaskReq, updateTask);
router.delete("/:id", deleteTask);

export default router;
