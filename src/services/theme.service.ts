import { computed, inject, Injectable, signal } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

export type AppTheme = 'tasktrack-light' | 'tasktrack-dark';

const STORAGE_KEY = 'tasktrack.theme.v2';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly nbTheme = inject(NbThemeService);
  private readonly themeSignal = signal<AppTheme>(this.read());

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = computed(() => this.themeSignal() === 'tasktrack-dark');

  constructor() {
    this.nbTheme.changeTheme(this.themeSignal());
  }

  set(theme: AppTheme, persist = true): void {
    this.themeSignal.set(theme);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
    this.nbTheme.changeTheme(theme);
  }

  toggle(): void {
    this.set(this.isDark() ? 'tasktrack-light' : 'tasktrack-dark');
  }

  private read(): AppTheme {
    return localStorage.getItem(STORAGE_KEY) === 'tasktrack-dark' ? 'tasktrack-dark' : 'tasktrack-light';
  }
}
