import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus,  } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  public tasks = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto) {
    console.log(filterDto)
    const {status, search } = filterDto;

    let tasks = this.getAllTasks();
    if(status) {
      this.tasks = this.tasks.filter(t => t.status === status)
    }
    if(search) {
      this.tasks = this.tasks.filter(t => {
        if(t.title.includes(search) || t.description.includes(search)) {
          return true;
        }
        return false;
      })
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(t => t.id == id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateTaskStatus(id, status: TaskStatus): Task {
    let taskToBeUpdated = this.tasks.find(t => t.id === id);
    taskToBeUpdated.status = status;

    return taskToBeUpdated;
  }
}
