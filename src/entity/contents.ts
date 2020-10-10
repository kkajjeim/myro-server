import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Routine} from "./routine";

@Entity()
export class Contents extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "string"})
    title: string;

    @Column({type: "string"})
    subTitle: string;

    @Column({type: "string"})
    person: string;

    @Column({type: "string"})
    mainImage: string;

    @Column({type: "string"})
    image1: string;

    @Column({type: "string"})
    image2: string;

    @Column({type: "string"})
    image3: string;

    @Column({type: "string"})
    body1: string;

    @Column({type: "string"})
    body2: string;

    @Column({type: "string"})
    body3: string;

    @Column({type: "string"})
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

    @Column({type: "string"})
    time: string;

    @OneToMany(type => Routine, routine => routine.contents)
    routines: Routine[];

}
