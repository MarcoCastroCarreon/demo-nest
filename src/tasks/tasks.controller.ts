import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './intefaces/Task';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getTasks(): Task[] {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getIndividualTask(@Param('id') id: string): Task {
        return this.taskService.getTask(+id);
    }

    @Post()
    createTask(@Body() task: CreateTaskDTO): {} {
        task.title = 'creating task';
        return task;
    }
}
