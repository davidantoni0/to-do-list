import { Router } from "express";
import { UserController } from "../controllers/UserController";



const router = Router();
const userController = new UserController();


router.get("/", userController.listUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser)
router.patch("/:id", userController.updateUser)
router.patch("/:id/active", userController.toggleActiveUser)

export const userRoutes = router;