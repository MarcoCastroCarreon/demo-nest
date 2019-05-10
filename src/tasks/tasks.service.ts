import { Injectable } from '@nestjs/common';
import { Task } from './intefaces/Task';

@Injectable()
export class TasksService {
    tasks: Task[] = [
        {
            id: 1,
            title: 'cuak',
            description: 'hi',
            done: true,
        },
        {
            id: 2,
            title: 'cuak',
            description: 'hi',
            done: true,
        },
    ];

    getTasks(): Task[] {
        return this.tasks;
    }

    getTask(id: number): Task {
        return this.tasks.find(task => task.id === id);
    }
}
