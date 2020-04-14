import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";
import {Blog} from "./Blog";


@Entity()
export class BlogPost{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 100)
    name: string;

    @ManyToMany(type => Blog)
    blog: BlogPost[]
}
