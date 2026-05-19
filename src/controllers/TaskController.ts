import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { BadRequestError } from "../helpers/apiError";


export class TaskController {
    private taskService = new TaskService()
    
        list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = await this.taskService.listTask()
            return res.status(200).json(tasks)
            } catch (error: unknown) {
                next(error)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { taskTitle, content} = req.body
            const id = Number(req.params.id)
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido")
            }
            await this.taskService.validateSchema(req.body)
            const newTask = await this.taskService.createTask(taskTitle, content, id)
            return res.status(201).json(newTask)
        } catch (error: unknown) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = Number(req.params.id)
            if (isNaN(taskId)) {
                throw new BadRequestError("Id inválido.")
            }
            await this.taskService.validateSchema(req.body, true)
            const task = await this.taskService.updateTask(taskId, req.body)
            return res.status(201).json(task)
        } catch (error : unknown) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                throw new BadRequestError("Id inválido")
            }
            await this.taskService.deleteTask(id)
            return res.status(204).send()  
        } catch (error: unknown) {
            next(error)
        }
    }
}