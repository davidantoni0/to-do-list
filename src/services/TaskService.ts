import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";
import { User, UserRole } from "../entities/User";
import { formatErrors } from "../helpers/formatErrors";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiError";
import { open } from "node:fs";


export class TaskService {
    private taskRepository = AppDataSource.getRepository(Task);
    private userRepository = AppDataSource.getRepository(User);

    validateSchema = async (data: Partial<Task>, partial = false) => {
        const temp = this.taskRepository.create(data);
        const errors = await validate(temp, { skipMissingProperties: partial });
        if (errors.length > 0) {
          const formattedErrors = formatErrors(errors);
          throw new BadRequestError("Falha de validação", formattedErrors);
        }
      };
      
    list = async () => {
          return await this.taskRepository.find({ relations: ["user"] })
    };
      
    create = async (taskTitle: string, content: string, idUser: number, userRole: UserRole) => {
        if (userRole !== UserRole.ADMIN) {
            throw new UnauthorizedError("Voçê não tem autorização para criar novas tarefas")
        }
        const user = await this.userRepository.findOneBy({ idUser: idUser })
        const createdby = idUser
        return this.taskRepository.save({ taskTitle, content, createdBy: createdby, taskStatus: TaskStatus.OPEN, user})
    };
    
    update = async (idTask: number, idUser: number, data: Partial<Task>) => {
        const task = await this.taskRepository.findOne({
            where: { idTask: idTask },
            relations: ["user"]
        })
        if (!task) {
            throw new NotFoundError("Task não encontrada.")
        }
        if (task.user.idUser !== idUser) {
            throw new UnauthorizedError("Você não tem permissa para atualizar esta tarefa")
        }
        this.taskRepository.merge(task, data)
        return await this.taskRepository.save(task);
    }
    
    delete = async (idTask: number, idUser: number, userRole: UserRole) => {
        const task = await this.taskRepository.findOne({
            where: { idTask: idTask },
            relations: ["user"]
        })
        if (!task) {
            throw new NotFoundError("Task não encontrada.")
        }
        return await this.taskRepository.delete(idTask)
    }

    changeStatus = async (idTask: number, idUser: number, userRole: UserRole) => {
        const task = await this.taskRepository.findOne({
            where: { idTask },
            relations: ["user"]
        });
        if (!task) {
            throw new NotFoundError("Task não encontrada.");
        }
        if (userRole !== UserRole.ADMIN && task.user.idUser !== idUser) {
            throw new UnauthorizedError("Você não tem permissão para alterar esta task.");
        }
        if (userRole !== UserRole.ADMIN) {
            task.taskStatus = TaskStatus.PENDING;
        } else {
            task.taskStatus = TaskStatus.FINALIZED;
        }
        await this.taskRepository.save(task);
        return task;
    };

    delegate = async (idTask: number, idUser: number, userRole: UserRole) => {
        const task = await this.taskRepository.findOne({
            where: { idTask },
            relations: ["user"]
        });
        if (!task) {
            throw new NotFoundError("Task não encontrada.");
        }
        const user = await this.userRepository.findOneBy({ idUser: idUser })
        if (!user) {
            throw new NotFoundError("Usuário não encontrado.")
        }
        if (userRole !== UserRole.ADMIN) {
            throw new UnauthorizedError("Você não tem permissão para delegar esta task.");
        }
        task.user.idUser = idUser
        await this.taskRepository.save(task);
        return task;
    };
}