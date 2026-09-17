import { CommonModule } from '@angular/common';
import { Component, computed, inject, Injector, OnInit, signal, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule,
  NbMenuService,
  NbPopoverModule,
  NbSidebarModule,
  NbUserModule,
} from '@nebular/theme';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BasePage } from '../services/base-page';
import { MSG_CONST } from './constants/message.const';
import { APP_ROUTES, DEFAULT_BOARD_ID } from './constants/routes.const';
import { getPersonColor, getRoleName, normalizeText } from './constants/task-status';

interface AppNotification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

const SIDEBAR_KEY = 'tasktrack.sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule,
    NbButtonModule,
    NbContextMenuModule,
    NbUserModule,
    NbPopoverModule,
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbDialogModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BasePage implements OnInit {
  title = 'TaskTrack';
  readonly auth = inject(AuthService);
  private readonly menuService = inject(NbMenuService);
  readonly sidebarCompact = signal(localStorage.getItem(SIDEBAR_KEY) === 'compacted');

  readonly getPersonColor = getPersonColor;
  readonly getRoleName = getRoleName;

  notifications: AppNotification[] = [
    { id: 1, text: 'A tarefa Auditoria de segurança está atrasada.', time: 'Há 8 min', read: false },
    { id: 2, text: 'Ana Souza concluiu a Revisão de código.', time: 'Há 25 min', read: false },
    { id: 3, text: 'Uma nova tarefa foi atribuída a você: Criar landing page.', time: 'Há 1 h', read: false },
    { id: 4, text: 'Bruno Mendes atualizou o Backup do banco de dados.', time: 'Ontem', read: true },
  ];

  readonly boardSearch = signal('');
  newBoardName = '';

  readonly contextMenuItems = [
    { title: 'Usuários', icon: 'people-outline', data: { action: 'users' } },
    { title: 'Configurações', icon: 'settings-2-outline', data: { action: 'profile' } },
    { title: 'Sair', icon: 'log-out-outline', data: { action: 'logout' } },
  ];

  readonly menu = computed<NbMenuItem[]>(() => {
    const term = normalizeText(this.boardSearch());
    return this.boardSrvc.boards()
      .filter((board) => !term || normalizeText(`${board.name} ${board.company} ${board.description}`).includes(term))
      .map((board) => ({
        title: board.name,
        icon: board.icon,
        link: `/${APP_ROUTES.BOARDS}/${board.id}`,
        pathMatch: 'full',
      }));
  });

  constructor(public injector: Injector) {
    super(injector);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        takeUntilDestroyed(),
      )
      .subscribe(({ item }) => {
        if (item.data?.['action'] === 'logout') {
          this.logout();
        }

        if (item.data?.['action'] === 'users') {
          this.router.navigate(['/', APP_ROUTES.USERS]);
        }

        if (item.data?.['action'] === 'profile') {
          this.router.navigate(['/', APP_ROUTES.PROFILE]);
        }
      });
  }

  ngOnInit(): void {
    queueMicrotask(() => this.applySidebar());
  }

  get unreadCount(): number {
    return this.notifications.filter((item) => !item.read).length;
  }

  markNotificationsRead(): void {
    this.notifications = this.notifications.map((item) => ({ ...item, read: true }));
  }

  searchBoards(event: Event): void {
    this.boardSearch.set((event.target as HTMLInputElement).value);
  }

  openNewBoardDialog(dialog: TemplateRef<unknown>): void {
    this.newBoardName = '';
    if (this.sidebarCompact()) {
      this.toggleSidebar();
    }
    this.dialogSrvc.open(dialog);
  }

  createBoard(ref: { close: () => void }): void {
    const name = this.newBoardName.trim();
    if (!name) {
      return;
    }

    const board = this.boardSrvc.addBoard(name);
    this.boardSearch.set('');
    ref.close();
    this.toastrSrvc.info(MSG_CONST.BOARD_CREATED, 'Novo quadro');
    this.router.navigate(['/', APP_ROUTES.BOARDS, board.id]);
  }

  goToHome(): void {
    this.router.navigate(['/', APP_ROUTES.BOARDS, this.boardSrvc.currentBoardId() || DEFAULT_BOARD_ID]);
  }

  toggleSidebar(): void {
    this.sidebarCompact.update((value) => !value);
    localStorage.setItem(SIDEBAR_KEY, this.sidebarCompact() ? 'compacted' : 'expanded');
    this.applySidebar();
  }

  logout(): void {
    this.auth.logout();
    this.toastrSrvc.success(MSG_CONST.LOGOUT_OK, 'Até logo');
    this.router.navigate(['/', APP_ROUTES.LOGIN]);
  }

  private applySidebar(): void {
    if (this.sidebarCompact()) {
      this.sidebarSrvc.compact('menu');
    } else {
      this.sidebarSrvc.expand('menu');
    }
  }
}
