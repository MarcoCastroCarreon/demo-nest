import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository, getCustomRepository, getRepository } from 'typeorm';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private  taskRepository: TaskRepository,
    ) {}

    async getTasks(): Promise<Task[]> {
        const tasksList = await getCustomRepository(TaskRepository).getTasks();
        return tasksList[0];
    }

    async getTask(id: number): Promise<Task> {
        const task = await getCustomRepository(TaskRepository);
        const taskGot = task.getTask(id);
        return taskGot;
    }

    async createTask(task: Task): Promise<{}> {
        task.status = true;
        const savedTask = await getCustomRepository(TaskRepository).saveTask(task);
        return {
            id: savedTask.id,
            title: savedTask.title,
            description: savedTask.description,
            status: savedTask.status,
        };
    }
}
