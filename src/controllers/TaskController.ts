import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/TaskService";


export class TaskController {
    private taskService = new TaskService()

    create = async (req: Request, res: Response, next: NextFunction) => {
        const { taskTitle, content } = req.body
        const newTask = await this.taskService.createTask(taskTitle, content)
        return res.status(201).json(newTask)
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        const tasks = await this.taskService.listTask()
        return res.status(201).json(tasks)
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const taskId = Number(req.params.id)
        const task = await this.taskService.updateTask(taskId, req.body)
        return res.status(201).json(task)
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id)
        await this.taskService.deleteTask(id)
        return res.status(204).send()
    }
}