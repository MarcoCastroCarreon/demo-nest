import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskRepository } from 'src/repositories/task.repository';
import { TaskInterface } from './interface/task.inteface';
import { TaskDTO } from './dto/task.dto';
import { isBoolean } from 'util';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private  taskRepository: TaskRepository,
    ) {}

    async getTasks(): Promise<Task[]> {
        const tasksList = await this.taskRepository.getTasks();
        return tasksList;
    }

    async getTask(id: number): Promise<Task> {
        const task = await this.taskRepository.getTask(id);
        return task;
    }

    async createTask(task: TaskDTO): Promise<TaskInterface> {
        if (!isBoolean(task.status))
            throw new BadRequestException(); // HttpException({message: 'Status is boolean'}, HttpStatus.BAD_REQUEST); }
        const newTask = new Task();
        newTask.title = task.title;
        newTask.status = task.status;
        newTask.description = task.description;

        const savedTask = await this.taskRepository.saveTask(newTask);
        return {
            id: savedTask.id,
            title: savedTask.title,
            description: savedTask.description,
            status: savedTask.status,
        };
    }
}
