import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository, getCustomRepository, getRepository } from 'typeorm';
import { TaskRepository } from 'src/repositories/task.repository';
import { TaskInterface } from './interface/task.inteface';
import { CreateTaskDTO } from './dto/create-task.dto';
import { isBoolean } from 'util';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private  taskRepository: TaskRepository,
    ) {}

    async getTasks(): Promise<Task[]> {
        const tasksList = await getCustomRepository(TaskRepository).getTasks();
        return tasksList;
    }

    async getTask(id: number): Promise<Task> {
        const task = await getCustomRepository(TaskRepository);
        const taskGot = task.getTask(id);
        return taskGot;
    }

    async createTask(task: CreateTaskDTO): Promise<TaskInterface> {
        if (!isBoolean(task.status)) { throw new HttpException({message: 'Status is boolean'}, HttpStatus.BAD_REQUEST); }
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
