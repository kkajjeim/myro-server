import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, AfterLoad} from "typeorm";
import {Routine} from "./routine";
import {generateDays} from "../common";

@Entity()
export class Contents extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    title: string;

    @Column({type: "text"})
    subTitle: string;

    @Column({type: "text"})
    person: string;

    @Column({type: "text"})
    mainImage: string;

    @Column({type: "text"})
    image1: string;

    @Column({type: "text", nullable: true})
    image2: string;

    @Column({type: "text", nullable: true})
    image3: string;

    @Column({type: "text"})
    body1: string;

    @Column({type: "text", nullable: true})
    body2: string;

    @Column({type: "text", nullable: true})
    body3: string;

    @Column({type: "text"})
    recommendTime: string;

    @Column({type: "boolean"})
    mon: boolean;

    @Column({type: "boolean"})
    tue: boolean;

    @Column({type: "boolean"})
    wed: boolean;

    @Column({type: "boolean"})
    thu: boolean;

    @Column({type: "boolean"})
    fri: boolean;

    @Column({type: "boolean"})
    sat: boolean;

    @Column({type: "boolean"})
    sun: boolean;

    @Column({type: "int"})
    time: number;

    @OneToMany(type => Routine, routine => routine.contents)
    routines: Routine[];

    days: number[];

    @AfterLoad()
    setComputed() {
        this.days = generateDays(this.sun, this.mon, this.tue, this.wed, this.thu, this.fri, this.sat);
    }
}
