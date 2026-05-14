import { UserService } from "../services/UserService";
import { Request, Response, NextFunction } from "express";



export class UserController{
    private userService = new UserService();

    createUser = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const{name, lastName, email} = req.body;
            console.log(name, lastName, email);
            const newUser = await this.userService.create(name,lastName, email);
            return res.status(200).json(newUser);
            
        } catch (error) {
           next(error); 
        }
        
    };
    listUsers = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const users = await this.userService.listAll();
      return res.json(users);
        } catch (error) {
            next(error);
        }
    };
    deleteUser = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = Number(req.params.id);
            await this.userService.delete(id);
            return res.status(204).send();
        } catch (error) {
            next(error)
        }
    };
    updateUser = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const productId = Number(req.params.id);
            const product = await this.userService.update(productId, req.body);
            return res.status(200).json(product);
        } catch (error) {
            next(error)
        }
    };
    toggleActiveUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.toggleActive(id);
            return res.json({
                message: `Usuário ${
                user.isActive ? "ativado" : "desativado"
                    }   com sucesso.`,
                    user,
                });
        } catch (error) {
            next(error)
        }
    };
}