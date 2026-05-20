import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()
const taskController = new TaskController()

router.get("/", taskController.listTasks)
router.post("/:id", authMiddleware, taskController.createTask)
router.patch("/:id", authMiddleware, taskController.updateTask)
router.delete("/:id", authMiddleware, taskController.deleteTask)

export const taskRoutes = router