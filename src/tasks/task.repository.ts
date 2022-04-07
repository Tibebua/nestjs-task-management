import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', {status})
        }
        
        if(search) {
            query.andWhere('task.description LIKE LOWER(:search) OR task.title LIKE LOWER(:search)', 
            {search: `%${search}%`})
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        return await this.save(task);
    }
}