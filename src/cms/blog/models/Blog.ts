import {Entity, OneToMany, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Length} from "class-validator";
import {BlogPost} from "./BlogPost";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 100)
    name: string;

    @Column()
    @Length(1, 100)
    author: string;

    @ManyToMany(type => BlogPost)
    blogPosts: BlogPost[];
}
