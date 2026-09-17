import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTagModule,
} from '@nebular/theme';
import { firstValueFrom } from 'rxjs';
import { BasePage } from '../../../services/base-page';
import { MSG_CONST } from '../../constants/message.const';
import {
  getInitials,
  getPersonColor,
  getStatusColor,
  getStatusName,
  normalizeText,
  TASK_STATUS,
} from '../../constants/task-status';
import { TaskModel } from '../../models/task-model';
import { UserModel } from '../../models/user-model';
import { RichTextEditorComponent } from '../../components/rich-text-editor/rich-text-editor.component';
import { stripHtml } from '../../shared/html.util';
import { SafeHtmlPipe } from '../../shared/safe-html.pipe';

type TaskViewMode = 'list' | 'board';

interface TaskGroup {
  status: number;
  title: string;
  color: string;
  tasks: TaskModel[];
}

const VIEW_KEY = 'tasktrack.taskView';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NbFormFieldModule,
    NbInputModule,
    NbDatepickerModule,
    NbDialogModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTagModule,
    NbSelectModule,
    RichTextEditorComponent,
    SafeHtmlPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends BasePage implements OnInit {
  selectedSort: number | null = null;
  selectedStatusFilter: number | null = null;
  selectedResponsible: string | null = null;
  searchTerm = '';
  viewMode: TaskViewMode = this.readView();
  taskResponsibles: UserModel[] = [];
  filteredTasks: TaskModel[] = [];
  groups: TaskGroup[] = [];
  collapsedGroups = new Set<number>();
  tasksForm!: FormGroup;
  editing = false;
  choosedTask: TaskModel | null = null;
  minDate: Date = new Date();

  constructor(public injector: Injector) {
    super(injector);

    effect(() => {
      this.taskSrvc.tasks();
      this.boardSrvc.currentBoardId();
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.createForms();
    this.taskResponsibles = this.userSrvc.users();
    this.applyFilters();
  }

  createForms(): void {
    this.tasksForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      status: [TASK_STATUS.PENDING, Validators.required],
      responsibleId: ['', Validators.required],
      registerDate: [null],
    });
  }

  setView(mode: TaskViewMode): void {
    this.viewMode = mode;
    localStorage.setItem(VIEW_KEY, mode);
  }

  isCollapsed(status: number): boolean {
    return this.collapsedGroups.has(status);
  }

  toggleGroup(status: number): void {
    if (this.collapsedGroups.has(status)) {
      this.collapsedGroups.delete(status);
    } else {
      this.collapsedGroups.add(status);
    }
  }

  searchTasks(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  applyFilters(): void {
    const boardId = this.boardSrvc.currentBoardId();
    let list = this.taskSrvc.tasks().filter((task) => task.boardId === boardId);

    if (this.searchTerm.trim()) {
      const term = normalizeText(this.searchTerm);
      list = list.filter((task) =>
        normalizeText(`${task.title || ''} ${stripHtml(task.description)}`).includes(term),
      );
    }

    if (this.selectedResponsible) {
      list = list.filter((task) => task.responsibleId === this.selectedResponsible);
    }

    if (this.selectedStatusFilter !== null) {
      list = list.filter((task) => task.status === this.selectedStatusFilter);
    }

    if (this.selectedSort === 0) {
      list.sort((a, b) => new Date(a.expirationDate || 0).getTime() - new Date(b.expirationDate || 0).getTime());
    } else if (this.selectedSort === 1) {
      list.sort((a, b) => new Date(b.expirationDate || 0).getTime() - new Date(a.expirationDate || 0).getTime());
    }

    this.filteredTasks = list;
    this.groups = [
      { status: TASK_STATUS.PENDING, title: 'Pendentes', color: '#fdab3d', tasks: list.filter((task) => task.status === TASK_STATUS.PENDING) },
      { status: TASK_STATUS.IN_PROGRESS, title: 'Em andamento', color: '#579bfc', tasks: list.filter((task) => task.status === TASK_STATUS.IN_PROGRESS) },
      { status: TASK_STATUS.DONE, title: 'Concluídas', color: '#00c875', tasks: list.filter((task) => task.status === TASK_STATUS.DONE) },
    ];
  }

  getStatusName = getStatusName;
  getStatusColor = getStatusColor;
  getPersonColor = getPersonColor;
  getInitials = getInitials;

  plainText(value?: string): string {
    return stripHtml(value);
  }

  isOverdue(task: TaskModel): boolean {
    if (task.status === TASK_STATUS.DONE || !task.expirationDate) {
      return false;
    }

    const limit = new Date(task.expirationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return limit < today;
  }

  async drop(event: CdkDragDrop<TaskModel[]>, status: number): Promise<void> {
    if (event.previousContainer === event.container) {
      return;
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    const task = event.container.data[event.currentIndex];
    if (task?.id) {
      await firstValueFrom(this.taskSrvc.updateStatus(task.id, status));
    }
  }

  openTaskView(dialog: TemplateRef<unknown>, task: TaskModel): void {
    this.choosedTask = task;
    this.dialogSrvc.open(dialog);
  }

  openTaskDialog(dialog: TemplateRef<unknown>, task?: TaskModel | null, status?: number): void {
    this.editing = !!task;
    this.choosedTask = task || null;
    this.tasksForm.reset({
      status: status ?? TASK_STATUS.PENDING,
    });

    if (task) {
      this.tasksForm.patchValue({
        ...task,
        expirationDate: task.expirationDate ? new Date(task.expirationDate) : null,
      });
    }

    this.dialogSrvc.open(dialog);
  }

  openDeleteDialog(dialog: TemplateRef<unknown>, task: TaskModel): void {
    this.choosedTask = task;
    this.dialogSrvc.open(dialog);
  }

  async deleteTask(): Promise<void> {
    if (!this.choosedTask?.id) {
      return;
    }

    try {
      await firstValueFrom(this.taskSrvc.deleteTask(this.choosedTask.id));
      this.toastrSrvc.success(MSG_CONST.DELETED_TASK_OK, 'Pronto');
      this.choosedTask = null;
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.DELETED_TASK_ERROR, 'Erro');
      console.error(error);
    }
  }

  async addOrUpdateTask(): Promise<void> {
    if (this.tasksForm.invalid) {
      this.tasksForm.markAllAsTouched();
      return;
    }

    try {
      const formData = this.tasksForm.getRawValue() as TaskModel;
      formData.boardId = this.choosedTask?.boardId || this.boardSrvc.currentBoardId();
      if (this.editing) {
        formData.registerDate = this.choosedTask?.registerDate;
      }
      await firstValueFrom(this.taskSrvc.addOrUpdateTask(formData));
      this.toastrSrvc.success(MSG_CONST.SAVE_DATA_OK, 'Pronto');
      this.tasksForm.reset();
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.SAVE_DATA_ERROR, 'Erro');
      console.error(error);
    }
  }

  private readView(): TaskViewMode {
    return localStorage.getItem(VIEW_KEY) === 'board' ? 'board' : 'list';
  }
}
