import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

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
    @IsOptional()
    @IsEnum(TaskStatus, { message: "Status inválido('open, pending ou finalized')" })
    taskStatus!: TaskStatus;
    
    @Column("integer")
    createdBy!: number;

    @Column({type: "date", default: () => "CURRENT_DATE" })
    createdAt!: Date;    

    @ManyToOne(()=> User, (user) => user.task)
    user?:User;


}