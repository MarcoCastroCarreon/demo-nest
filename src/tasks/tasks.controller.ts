import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    @Get()
    getTasks(): string {
        return 'Tasks';
    }

    @Post()
    createTask(@Body() task: CreateTaskDTO): {} {
        task.title = 'creating task';
        return task;
    }
}
