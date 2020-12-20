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

    @ManyToOne(type => Contents, content => content.routines, {eager: true})
    contents: Contents;

    @OneToMany(type => Success, success => success.routine)
    success: number;

    @Column({type: "boolean", default: false})
    mon: boolean;

    @Column({type: "boolean", default: false})
    tue: boolean;

    @Column({type: "boolean", default: false})
    wed: boolean;

    @Column({type: "boolean", default: false})
    thu: boolean;

    @Column({type: "boolean", default: false})
    fri: boolean;

    @Column({type: "boolean", default: false})
    sat: boolean;

    @Column({type: "boolean", default: false})
    sun: boolean;

    @Column({type: "text"})
    alarmTime: string;

    @Column({type: "boolean", default: true})
    isAlarm: boolean;

    @Column({type: "boolean", default: true})
    isActive: boolean;
}
