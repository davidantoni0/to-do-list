import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";

export class TaskService {
    private taskRepository = AppDataSource.getRepository(Task)
    
    createTask = async (taskTitle: string, content: string) => {
        const newTask  = this.taskRepository.create({
            taskTitle,
            content,
            isActive: true})
            return this.taskRepository.create(newTask)
    } 
    
    deleteTask = async (idTask: number) => {
        const task = await this.taskRepository.findOneBy({ idTask })
        return await this.taskRepository.delete(idTask)
    }

    updateTask = async (idTask: number, data: Partial<Task>) => {
        const task = await this.taskRepository.findOneBy({ idTask })
        this.taskRepository.merge(task, data)
        return await this.taskRepository.save(task);
    }

    listTask = async () => {
        return await this.taskRepository.find()
    }
}