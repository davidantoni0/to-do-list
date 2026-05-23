import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";



const router = Router();
const userController = new UserController();


router.get("/", userController.listUsers);
router.post("/", userController.createUser);
router.delete("/:id/delete", authMiddleware, userController.deleteUser)
router.patch("/:id", userController.updateUser)
router.patch("/:id/active", authMiddleware, userController.toggleActiveUser)

export const userRoutes = router;