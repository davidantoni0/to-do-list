import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { BadRequestError } from "../helpers/apiError";
import { UserRole } from "../entities/User";

export class TaskController {
    private taskService = new TaskService();
    
        listTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = await this.taskService.list();
            return res.status(200).json(tasks);
            } catch (error: unknown) {
                next(error);
        }
    }

    createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { taskTitle, content} = req.body;
            const userRole = req.user_role;
            const id = req.user_id
            
            await this.taskService.validateSchema(req.body);
            const newTask = await this.taskService.create(taskTitle, content, id, userRole!);
            return res.status(201).json(newTask);
        } catch (error: unknown) {
            next(error);
        }
    }

    updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = Number(req.params.id);
            const userId = req.user_id
            if (isNaN(taskId)) {
                throw new BadRequestError("Id inválido.");
            }
            await this.taskService.validateSchema(req.body, true);
            const task = await this.taskService.update(taskId, userId!, req.body);
            return res.status(200).json(task);
        } catch (error : unknown) {
            next(error);
        }
    }

    deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const userId = req.user_id
            const userRole = req.user_role
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido");
            }
            await this.taskService.delete(id, userId!, userRole!);
            return res.status(204).send();
        } catch (error: unknown) {
            next(error);
        }
    }

    changeTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const userId = req.user_id
            const userRole = req.user_role
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido");
            }
            const task = await this.taskService.changeStatus(id, userId!, userRole!);
            return res.status(200).json(task);
        } catch (error: unknown) {
            next(error)
        }
    }

    delegateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.body.idUser);
            const userRole = req.user_role
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido");
            }
            if (isNaN(userId)) {
                throw new BadRequestError("Id de usuario inválido");
            }
            const task = await this.taskService.delegate(id, userId, userRole!);
            return res.status(200).json(task);
        } catch (error: unknown) {
            next(error)
        }
    }
}