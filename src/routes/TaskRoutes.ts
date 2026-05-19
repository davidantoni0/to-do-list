import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router()
const taskController = new TaskController()

router.get("/", taskController.list)
router.post("/:id", taskController.create)
router.patch("/:id", taskController.update)
router.delete("/:id", taskController.delete)

export const taskRoutes = router