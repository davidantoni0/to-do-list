import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

import { Task } from "./Task";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    idUser!: number;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    name!: string;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @Column("varchar", { unique: true })
    @IsNotEmpty()
    @IsEmail({}, { message: "O e-mail fornecido não é válido" })
    email!: string;

    @Column({ type: "varchar", select: false })
    @IsNotEmpty({ message: "A senha é obrigatória" })
    @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    password!: string;
    
    @Column({type: "boolean", default: true})
    isActive!: boolean;
    
    @OneToMany(()=> Task, (task) => task.user)
        task!:Task;
}