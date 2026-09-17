import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NbIconModule } from '@nebular/theme';
import { AuthService } from '../../../services/auth.service';
import { MockTaskService } from '../../../services/mock-task.service';
import { MockUserService } from '../../../services/mock-user.service';
import { TASK_STATUS } from '../../constants/task-status';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NbIconModule, TasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly auth = inject(AuthService);
  private readonly taskSrvc = inject(MockTaskService);
  private readonly userSrvc = inject(MockUserService);

  readonly today = new Date();
  readonly firstName = computed(() => this.auth.currentUser()?.name?.split(' ')[0] || 'usuário');
  readonly usersCount = computed(() => this.userSrvc.users().length);
  readonly tasksCount = computed(() => this.taskSrvc.tasks().length);
  readonly pendingCount = computed(() => this.taskSrvc.tasks().filter((task) => task.status === TASK_STATUS.PENDING).length);
  readonly inProgressCount = computed(() => this.taskSrvc.tasks().filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length);
  readonly doneCount = computed(() => this.taskSrvc.tasks().filter((task) => task.status === TASK_STATUS.DONE).length);
  readonly overdueCount = computed(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return this.taskSrvc.tasks().filter((task) => {
      if (task.status === TASK_STATUS.DONE || !task.expirationDate) {
        return false;
      }
      return new Date(task.expirationDate) < now;
    }).length;
  });

  readonly weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - 2 + index);
    return date;
  });

  isToday(date: Date): boolean {
    return date.toDateString() === this.today.toDateString();
  }
}
