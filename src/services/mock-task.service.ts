import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_TASKS, MOCK_USERS } from '../app/constants/mock.const';
import { TaskModel } from '../app/models/task-model';
import { TASK_STATUS } from '../app/constants/task-status';

@Injectable({
  providedIn: 'root',
})
export class MockTaskService {
  private readonly tasksState = signal<TaskModel[]>(MOCK_TASKS.map((task) => ({ ...task })));
  readonly tasks = this.tasksState.asReadonly();

  getTasks(): Observable<TaskModel[]> {
    return of(this.tasksState());
  }

  addOrUpdateTask(task: TaskModel): Observable<TaskModel> {
    const payload: TaskModel = {
      ...task,
      id: task.id || Date.now().toString(),
      registerDate: task.registerDate || new Date(),
      progress: task.status === TASK_STATUS.DONE ? 100 : Number(task.progress || 0),
      responsible: MOCK_USERS.find((user) => user.id === task.responsibleId),
    };

    this.tasksState.update((list) => {
      const index = list.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        return [payload, ...list];
      }

      const next = [...list];
      next[index] = payload;
      return next;
    });

    return of(payload);
  }

  deleteTask(taskId: string): Observable<void> {
    this.tasksState.update((list) => list.filter((task) => task.id !== taskId));
    return of(undefined);
  }

  updateStatus(taskId: string, status: number): Observable<TaskModel | undefined> {
    const current = this.tasksState().find((task) => task.id === taskId);
    if (!current) {
      return of(undefined);
    }

    return this.addOrUpdateTask({
      ...current,
      status,
      progress: status === TASK_STATUS.DONE ? 100 : current.progress,
    });
  }
}
