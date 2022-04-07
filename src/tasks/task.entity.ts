import { TaskStatus } from './task-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public status: TaskStatus;
}