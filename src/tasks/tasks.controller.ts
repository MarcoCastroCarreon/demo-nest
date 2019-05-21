import { Controller, Get, Post, Body, Param, HttpCode, Logger } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { TaskInterface } from './interface/task.inteface';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    @HttpCode(200)
    getTasks(): Promise<TaskInterface[]> {
        return this.taskService.getTasks();
    }

    @Get(':id')
    @HttpCode(200)
    getIndividualTask(@Param('id') id: string): Promise<TaskInterface> {
        return this.taskService.getTask(+id);
    }

    @Post()
    @HttpCode(201)
    createTask(@Body() task: TaskDTO): Promise<TaskInterface> {
        const savedTask = this.taskService.createTask(task);
        return savedTask;
    }
}
