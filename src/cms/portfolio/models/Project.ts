import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";
import {Tech} from "./Tech";


@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 300)
    name: string;

    @Column()
    @Length(4, 300)
    image_url: string;

    @Column()
    @Length(4, 1000)
    description: string;

    @Column()
    @Length(4, 50)
    start_date: string;

    @Column()
    @Length(4, 50)
    end_date: string;

    @ManyToMany(type => Tech)
    techs: Tech[];

    @Column()
    @Length(4, 300)
    git_link: string;

    @Column()
    @Length(4, 300)
    web_link: string;

    @Column()
    @Length(4, 1000)
    other: string;
}
