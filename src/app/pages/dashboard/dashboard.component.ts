import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import { AuthService } from '../../../services/auth.service';
import { MockBoardService } from '../../../services/mock-board.service';
import { MockTaskService } from '../../../services/mock-task.service';
import { MockUserService } from '../../../services/mock-user.service';
import { APP_ROUTES, DEFAULT_BOARD_ID } from '../../constants/routes.const';
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
  readonly boardSrvc = inject(MockBoardService);
  private readonly taskSrvc = inject(MockTaskService);
  private readonly userSrvc = inject(MockUserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const board = this.boardSrvc.byId(params.get('boardId'));
      if (!board) {
        this.router.navigate(['/', APP_ROUTES.BOARDS, DEFAULT_BOARD_ID], { replaceUrl: true });
        return;
      }

      this.boardSrvc.setCurrent(board.id);
    });
  }

  readonly today = new Date();
  readonly firstName = computed(() => this.auth.currentUser()?.name?.split(' ')[0] || 'usuário');
  readonly board = this.boardSrvc.currentBoard;
  readonly boardTasks = computed(() =>
    this.taskSrvc.tasks().filter((task) => task.boardId === this.boardSrvc.currentBoardId()),
  );
  readonly usersCount = computed(() => this.userSrvc.users().length);
  readonly tasksCount = computed(() => this.boardTasks().length);
  readonly pendingCount = computed(() => this.boardTasks().filter((task) => task.status === TASK_STATUS.PENDING).length);
  readonly inProgressCount = computed(() => this.boardTasks().filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length);
  readonly doneCount = computed(() => this.boardTasks().filter((task) => task.status === TASK_STATUS.DONE).length);
  readonly overdueCount = computed(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return this.boardTasks().filter((task) => {
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
