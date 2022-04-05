import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { identity } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //console.log(filterDto);
    if(Object.keys(filterDto).length) {
      let x = this.tasksService.getTasksWithFilter(filterDto);
      return x;
    }
    else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    console.log(id);
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto ): Task {
    var task = this.tasksService.createTask(createTaskDto)
    return task;
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') id, @Body('status') status: TaskStatus) {
    return this.tasksService.updateTaskStatus(id, status)
  }

}
