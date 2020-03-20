import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";


@Entity()
export class Tech {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 100)
    name: string;

    @Column()
    @Length(4, 300)
    image_url: string;

    @Column()
    @Length(0, 1000)
    description: string;

    equals(other: Tech): boolean {
        if(other.id !== this.id) return false;
        if(other.description !== this.description) return false;
        if(other.image_url !== this.image_url) return false;
        return (other.name === this.name);
    }


}
