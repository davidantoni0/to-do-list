import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { formatErrors } from "../helpers/formatErrors";
import { ApiError, BadRequestError, NotFoundError } from "../helpers/apiError";
import bcrypt from "bcryptjs";


export class UserService{
    private userRepository = AppDataSource.getRepository(User);

    validateSchema = async (data: Partial<User>, partial = false) => {
        const temp = this.userRepository.create(data);
        const errors = await validate(temp, { skipMissingProperties: partial });
        if (errors.length > 0) {
          const formattedErrors = formatErrors(errors);
          throw new BadRequestError("Falha de validação", formattedErrors);
        }
    };

    create = async (userData: Partial<User>) => {

        const existingUser = await this.userRepository.findOneBy({
            email: userData.email,
          });
        if (existingUser) {
            throw new BadRequestError("Email fornecido já está em uso!");
        }
        
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
    return await this.userRepository.save({
      ...userData,
      password: hashedPassword,
    });
    };

    listAll = async()=>{
        return await this.userRepository.find();
    };

    delete = async (userId: number)=>{
        const user = await this.userRepository.findOne({ where:{idUser: userId}});
        console.log(user)
        if (!user) {
            throw new NotFoundError("Usuario não encontrado.")
        }
        if (user.isActive === true) {
            throw new BadRequestError("Usuario ativo não pode ser excluído.")
        }
        if (user.task && user.task.length > 0) {
            throw new BadRequestError("Usuario com tarefas associadas não pode ser excluído.")
        }
        return await this.userRepository.delete(userId);
    };

    update = async(userId: number, data: Partial<User>)=>{
        const user = await this.userRepository.findOne({where:{idUser: userId}});
        if(!user){
            throw new NotFoundError("Usuario não encontrado.")
        }
        this.userRepository.merge(user, data)
        return await this.userRepository.save(user)
    };

    toggleActive= async(userId: number)=>{
        const user = await this.userRepository.findOne({where:{idUser: userId}});
        if(!user){
            throw new NotFoundError("Usuario não encontrado.")
        }
        user.isActive = !user.isActive;
        await validate(user)
        await this.userRepository.save(user);
        return user;
    };
    

}