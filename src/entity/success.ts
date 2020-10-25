import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne} from "typeorm";
import {Routine} from "./routine";
import {Contents} from "./contents";

@Entity()
export class Success extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Routine, routine => routine.id)
    routine: number;

    @Column({type: "int"})
    record: number;
    
    @Column({type: "int"})
    satisfyScore: number;
    
    @Column({type: "boolean"})
    isNextWeek: boolean;

    @Column({type: "date"})
    startDate: Date;

    @Column({type: "int"})
    endDate: number;
    
    @Column({type: "boolean"})
    isAlarm: boolean;

    @Column({type: "boolean"})
    isActive: boolean;

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


}
