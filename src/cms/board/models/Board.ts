import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";
import {User} from "../../shared/models/User";
import {Post} from "./Post";


@Entity()
export class Board {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 100)
    name: string;

    @Column()
    @Length(4, 150)
    description: string;

    @Column()
    @Length(4, 300)
    board_image: string;

    @Column(type => Number)
    subscriberCount: number;

    @ManyToMany(type => User)
    admins: User[];

    @ManyToMany(type => User)
    subscribers: User[];

    @ManyToMany(type => Post)
    posts: Post[];

}