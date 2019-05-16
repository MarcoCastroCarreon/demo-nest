import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './../entities/task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    @HttpCode(200)
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get(':id')
    @HttpCode(200)
    getIndividualTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTask(+id);
    }

    @Post()
    @HttpCode(201)
    createTask(@Body() task: Task) {
        return JSON.stringify(this.taskService.createTask(task));
    }
}
