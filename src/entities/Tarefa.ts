import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


@Entity()
export class Tarefa{
    @PrimaryGeneratedColumn()
    identificador!: number;

    @Column("varchar")
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    tituloTarefa!:string;

    @Column("text")
    @IsNotEmpty()
    @IsString()
    conteudo!: string;

    @Column({type: "boolean", default: true})
        estaAtivo!: boolean;
    

    @ManyToOne(()=> Usuario, (usuario) => usuario.tarefa,{onDelete: "CASCADE"})
    usuario!:Usuario;
}