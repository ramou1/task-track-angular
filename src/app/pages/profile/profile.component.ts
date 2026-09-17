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
    password: [''],
  });

  ngOnInit(): void {
    const user = this.auth.currentUser();
    this.form.patchValue({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
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

  toggleTheme(): void {
    this.theme.toggle();
    this.toastr.success(this.theme.isDark() ? MSG_CONST.THEME_DARK : MSG_CONST.THEME_LIGHT, 'Aparência');
  }

  onThemeChange(dark: boolean): void {
    this.theme.set(dark ? 'tasktrack-dark' : 'tasktrack-light');
    this.toastr.success(dark ? MSG_CONST.THEME_DARK : MSG_CONST.THEME_LIGHT, 'Aparência');
  }
}
