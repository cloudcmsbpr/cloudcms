import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";


@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 400)
    title: string;

    @Column()
    @Length(4, 400)
    content: string;

    @Column(type => Number)
    voteCount: number;

    // todo - Handle multimedia types


}