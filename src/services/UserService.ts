import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { formatErrors } from "../helpers/formatErrors";
import { ApiError, BadRequestError } from "../helpers/apiError";


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

    create = async (name: string, lastName: string, email: string) => {

        const newUser = this.userRepository.create({
            name,
            lastName,
            email,
            isActive: true
        });
        console.log(newUser);
        await validate(newUser);
        return await this.userRepository.save(newUser);
    }
    listAll = async()=>{
        return await this.userRepository.find()
    }
    delete = async (userId: number)=>{
        const user = this.userRepository.findOne({ where:{idUser: userId}});
        return await this.userRepository.delete(userId);
    }
    update = async(userId: number, data: Partial<User>)=>{
        const user = await this.userRepository.findOne({where:{idUser: userId}});
        if(!user){
            throw new ApiError("User not found.", 404)
        }
        this.userRepository.merge(user, data)
        return await this.userRepository.save(user)
    }
    toggleActive= async(userId: number)=>{
        const user = await this.userRepository.findOne({where:{idUser: userId}});
        if(!user){
            throw new ApiError("User not found.", 404)
        }
        user.isActive = !user.isActive;
        await validate(user)
        await this.userRepository.save(user);
        return user;
    }

}