import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert} from "typeorm";
import {Routine} from "./routine";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 190, unique: true})
    email: string;

    @Column({type: "text"})
    password: string;

    @Column({type: "text"})
    name: string;

    @Column({type: "timestamp"})
    createdAt: Date;

    @OneToMany(type => Routine, routine => routine.user)
    routines: Routine[];

    @BeforeInsert()
    async hashpPassword (): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}
