import { Repository, EntityRepository } from 'typeorm';
import { Task } from 'src/entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    getTasks() {
        return Task.getTasks();
    }

    getTask(taskId: number) {
        return Task.getTask(taskId);
    }

    saveTask(task: Task) {
        return Task.save(task);
    }
 }
