import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { BadRequestError } from "../helpers/apiError";


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
            const id = Number(req.params.id);
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido");
            }
            await this.taskService.validateSchema(req.body);
            const newTask = await this.taskService.create(taskTitle, content, id);
            return res.status(201).json(newTask);
        } catch (error: unknown) {
            next(error);
        }
    }

    updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = Number(req.params.id);
            if (isNaN(taskId)) {
                throw new BadRequestError("Id inválido.");
            }
            await this.taskService.validateSchema(req.body, true);
            const task = await this.taskService.update(taskId, req.body);
            return res.status(201).json(task);
        } catch (error : unknown) {
            next(error);
        }
    }

    deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido");
            }
            await this.taskService.delete(id);
            return res.status(204).send();
        } catch (error: unknown) {
            next(error);
        }
    }
}