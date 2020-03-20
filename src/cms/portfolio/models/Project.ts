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

    equals(other: Project) : boolean {
        if(other.name !== this.name) return false;
        if(other.image_url !== this.image_url) return false;
        if(other.description !== this.description) return false;
        if(other.start_date !== this.start_date) return false;
        if(other.end_date !== this.end_date) return false;
        if(other.git_link !== this.git_link) return false;
        if(other.web_link !== this.web_link) return false;
        if(other.other !== this.other) return false;
        return (other.id === this.id)
    }
}
