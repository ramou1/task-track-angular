import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbUserModule,
} from '@nebular/theme';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BasePage } from '../services/base-page';
import { ThemeService } from '../services/theme.service';
import { MSG_CONST } from './constants/message.const';
import { APP_ROUTES } from './constants/routes.const';
import { getRoleName } from './constants/task-status';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BasePage implements OnInit {
  title = 'TaskTrack';
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  private readonly menuService = inject(NbMenuService);

  readonly contextMenuItems = [
    { title: 'Configurações', icon: 'settings-2-outline', data: { action: 'profile' } },
    { title: 'Sair', icon: 'log-out-outline', data: { action: 'logout' } },
  ];

  readonly menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: `/${APP_ROUTES.DASHBOARD}`,
      pathMatch: 'prefix',
    },
    {
      title: 'Usuários',
      icon: 'people-outline',
      link: `/${APP_ROUTES.USERS}`,
      pathMatch: 'full',
    },
    {
      title: 'Perfil',
      icon: 'settings-2-outline',
      link: `/${APP_ROUTES.PROFILE}`,
      pathMatch: 'full',
    },
  ];

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

        if (item.data?.['action'] === 'profile') {
          this.router.navigate(['/', APP_ROUTES.PROFILE]);
        }
      });
  }

  ngOnInit(): void {}

  getRoleName = getRoleName;

  goToHome(): void {
    this.router.navigate(['/', APP_ROUTES.DASHBOARD]);
  }

  toggleSidebar(): void {
    this.sidebarSrvc.toggle(true, 'menu');
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  logout(): void {
    this.auth.logout();
    this.toastrSrvc.success(MSG_CONST.LOGOUT_OK, 'Até logo');
    this.router.navigate(['/', APP_ROUTES.LOGIN]);
  }
}
