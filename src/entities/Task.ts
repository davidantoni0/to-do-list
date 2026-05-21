import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export enum TaskStatus {
    OPEN = "open",
    PENDING = "pending",
    FINALIZED = "finalized"
}
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

    @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.OPEN })
    @IsNotEmpty({ message: "O campo 'TaskStatus' está  vazio" })
    @IsEnum(TaskStatus, { message: "Status inválido('open, pending ou finalized')" })
    taskStatus!: TaskStatus;
    

    @ManyToOne(()=> User, (user) => user.task,{onDelete: "CASCADE"})
    user!:User;
}