import { computed, inject, Injectable, signal } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

export type AppTheme = 'tasktrack-light' | 'tasktrack-dark';

const STORAGE_KEY = 'tasktrack.theme';

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

  set(theme: AppTheme): void {
    this.themeSignal.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    this.nbTheme.changeTheme(theme);
  }

  toggle(): void {
    this.set(this.isDark() ? 'tasktrack-light' : 'tasktrack-dark');
  }

  private read(): AppTheme {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'tasktrack-dark' || stored === 'tasktrack-light' ? stored : 'tasktrack-light';
  }
}
