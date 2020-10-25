import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, OneToMany} from "typeorm";
import {User} from "./user";
import {Contents} from "./contents";
import {Success} from "./success";

@Entity()
export class Routine extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.routines)
    user: number;

    @ManyToOne(type => Contents, content => content.routines)
    contents: number;
    
    @OneToMany(type => Success, success => success.routine)
    success: number;

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

    @Column({type: "text"})
    alarmTime: string;

    @Column({type: "boolean"})
    isAlarm: boolean;

    @Column({type: "boolean"})
    isActive: boolean;

}
