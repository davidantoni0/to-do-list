import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

import { Task } from "./Task";

export enum UserRole{
    ADMIN = "admin",
    USER = "user"
  }

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    idUser!: number;

    @Column("varchar")
    @IsNotEmpty({message: "O campo 'name' está vazio"})
    @IsString()
    name!: string;

    @Column("varchar")
    @IsNotEmpty({message: "O campo 'e-mail' está vazio"})
    @IsString()
    lastName!: string;

    @Column("varchar", { unique: true })
    @IsNotEmpty({message: "O campo 'e-mail' está vazio"})
    @IsEmail({}, { message: "O e-mail fornecido não é válido" })
    email!: string;

    @Column({ type: "varchar", select: false })
    @IsNotEmpty({ message: "A senha é obrigatória" })
    @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    password!: string;

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    @IsNotEmpty({ message: "O cargo('role') é obrigatório" })
    @IsEnum(UserRole, { message: "Cargo inválido('admin' ou 'user')" })
    role!: UserRole;
    
    @Column({type: "boolean", default: true})
    isActive!: boolean;
    
    @OneToMany(()=> Task, (task) => task.user)
        task!:Task[];
}