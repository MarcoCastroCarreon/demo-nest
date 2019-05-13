import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './../entities/task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getIndividualTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTask(+id);
    }

    @Post()
    createTask(@Body() task: Task): Promise<Task> {
        return this.taskService.createTask(task);
    }
}
