import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

    @Get(':id')
    getTaskById(@Param('id') id: string): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') id, @Body('status') status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }

}
