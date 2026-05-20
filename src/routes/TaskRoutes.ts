import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router()
const taskController = new TaskController()

router.get("/", taskController.listTasks)
router.post("/:id", taskController.createTask)
router.patch("/:id", taskController.updateTask)
router.delete("/:id", taskController.deleteTask)

export const taskRoutes = router