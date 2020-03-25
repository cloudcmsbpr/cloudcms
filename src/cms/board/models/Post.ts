import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";


@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 100)
    title: string;

    @Column()
    @Length(4, 400)
    body: string;

    @Column()
    voteCount: number;

    // todo - Handle multimedia types


}