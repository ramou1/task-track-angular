import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbToastrService,
  NbToggleModule,
} from '@nebular/theme';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MockUserService } from '../../../services/mock-user.service';
import { ThemeService } from '../../../services/theme.service';
import { MSG_CONST } from '../../constants/message.const';
import { getInitials, getPersonColor, getRoleName } from '../../constants/task-status';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbToggleModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  private readonly fb = inject(FormBuilder);
  private readonly userSrvc = inject(MockUserService);
  private readonly toastr = inject(NbToastrService);

  readonly getInitials = getInitials;
  readonly getPersonColor = getPersonColor;
  readonly getRoleName = getRoleName;
  showPassword = false;
  photoPreview: string | null = null;

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    gender: [''],
    workplace: [''],
    jobTitle: [''],
    city: [''],
    language: ['pt-BR'],
    timezone: ['America/Sao_Paulo'],
    dateFormat: ['dd/MM/yyyy'],
    timeFormat: ['24h'],
    weekStart: ['monday'],
    emailNotifications: [true],
    password: [''],
  });

  ngOnInit(): void {
    const user = this.auth.currentUser();
    this.form.patchValue({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      workplace: user?.workplace || '',
      jobTitle: user?.jobTitle || '',
      city: user?.city || '',
      language: user?.language || 'pt-BR',
      timezone: user?.timezone || 'America/Sao_Paulo',
      dateFormat: user?.dateFormat || 'dd/MM/yyyy',
      timeFormat: user?.timeFormat || '24h',
      weekStart: user?.weekStart || 'monday',
      emailNotifications: user?.emailNotifications ?? true,
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const current = this.auth.currentUser();
    if (!current) {
      return;
    }

    const stored = this.userSrvc.users().find((user) => user.id === current.id);
    const value = this.form.getRawValue();
    const payload = {
      ...stored,
      ...current,
      name: value.name || current.name,
      email: value.email || current.email,
      phone: value.phone || '',
      gender: value.gender || current.gender,
      workplace: value.workplace || '',
      jobTitle: value.jobTitle || '',
      city: value.city || '',
      language: value.language || 'pt-BR',
      timezone: value.timezone || 'America/Sao_Paulo',
      dateFormat: value.dateFormat || 'dd/MM/yyyy',
      timeFormat: value.timeFormat || '24h',
      weekStart: value.weekStart || 'monday',
      emailNotifications: value.emailNotifications ?? true,
      password: value.password || stored?.password,
    };

    await firstValueFrom(this.userSrvc.addOrUpdateUser(payload));
    this.auth.setSession(payload);
    this.toastr.success(MSG_CONST.PROFILE_OK, 'Pronto');
    this.form.patchValue({ password: '' });
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = String(reader.result || '');
      this.toastr.success('Pré-visualização pronta. O upload ainda não está disponível.', 'Foto');
    };
    reader.readAsDataURL(file);
  }

  formatPreview(): string {
    const now = new Date();
    const dateFormat = this.form.value.dateFormat || 'dd/MM/yyyy';
    const timeFormat = this.form.value.timeFormat || '24h';
    const date = this.formatDate(now, dateFormat);
    const time = timeFormat === '12h'
      ? now.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: '2-digit', hour12: true })
      : now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const zone = this.timezoneLabel(this.form.value.timezone || 'America/Sao_Paulo');
    return `${date} · ${time} · ${zone}`;
  }

  private formatDate(date: Date, format: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    if (format === 'yyyy-MM-dd') {
      return `${date.getFullYear()}-${month}-${day}`;
    }
    if (format === 'dd MMM yyyy') {
      return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private timezoneLabel(zone: string): string {
    switch (zone) {
      case 'America/Manaus':
        return 'Manaus';
      case 'America/Rio_Branco':
        return 'Rio Branco';
      case 'America/Noronha':
        return 'Fernando de Noronha';
      case 'America/Recife':
        return 'Recife';
      default:
        return 'Brasília';
    }
  }

  toggleTheme(): void {
    this.theme.toggle();
    this.toastr.success(this.theme.isDark() ? MSG_CONST.THEME_DARK : MSG_CONST.THEME_LIGHT, 'Aparência');
  }

  onThemeChange(dark: boolean): void {
    this.theme.set(dark ? 'tasktrack-dark' : 'tasktrack-light');
    this.toastr.success(dark ? MSG_CONST.THEME_DARK : MSG_CONST.THEME_LIGHT, 'Aparência');
  }
}
