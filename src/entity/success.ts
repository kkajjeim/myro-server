import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne} from "typeorm";
import {Routine} from "./routine";
import {Contents} from "./contents";

@Entity()
export class Success extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Routine, routine => routine.id)
    routine: number;

    @Column({type: "int", default: 0})
    record: number;

    @Column({type: "int", nullable: true})
    satisfyScore: number;

    @Column({type: "boolean", default: false})
    isNextWeek: boolean;

    @Column({type: "timestamp"})
    startDate: Date;

    @Column({type: "timestamp"})
    endDate: Date;

    @Column({type: "boolean", default: true})
    isAlarm: boolean;

    @Column({type: "boolean", default: true})
    isActive: boolean;

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
}
