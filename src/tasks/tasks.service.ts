import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    getTasks(): Promise<Task[]> {
        return this.taskRepository.createQueryBuilder('Task')
            .getMany();
    }

    getTask(id: number): Promise<Task> {
        return this.taskRepository.findOne(id);
    }

    createTask(task: Task): Promise<Task> {
        return this.taskRepository.save(task);
    }
}
