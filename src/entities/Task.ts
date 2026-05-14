import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    idTask!: number;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    taskTitle!:string;

    @Column("text")
    @IsNotEmpty()
    @IsString()
    content!: string;

    @Column({type: "boolean", default: true})
        isActive!: boolean;
    

    @ManyToOne(()=> User, (user) => user.task,{onDelete: "CASCADE"})
    user!:User;
}