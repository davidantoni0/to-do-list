import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Tarefa } from "./Tarefa";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    identificador!: number;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    nome!: string;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    sobrenome!: string;

    @Column("varchar", { unique: true })
    @IsNotEmpty()
    @IsEmail({}, { message: "O e-mail fornecido não é válido" })
    email!: string;
    
    @Column({type: "boolean", default: true})
    estaAtivo!: boolean;
    
    @OneToMany(()=> Tarefa, (tarefa) => tarefa.usuario)
        tarefa!:Tarefa;
}