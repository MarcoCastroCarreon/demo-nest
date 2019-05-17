import { Repository, EntityRepository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDTO } from 'src/tasks/dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    getTasks(): Promise<Task[]> {
        return Task.getTasks();
    }

    getTask(taskId: number): Promise<Task> {
        return Task.getTask(taskId);
    }

    saveTask(task: Task): Promise<Task> {
        return Task.save(task);
    }
 }
