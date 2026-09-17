import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbToastrService } from '@nebular/theme';
import { MSG_CONST } from '../../constants/message.const';
import { APP_ROUTES, DEFAULT_BOARD_ID } from '../../constants/routes.const';
import { AuthService } from '../../../services/auth.service';
import { MockBoardService } from '../../../services/mock-board.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly boards = inject(MockBoardService);
  private readonly toastr = inject(NbToastrService);

  showPassword = false;
  submitting = false;
  errorMessage = '';
  readonly adminHint = 'admin@tasktrack.com / admin123';
  readonly userHint = 'alice@gmail.com / user123';

  readonly plans = [
    {
      name: 'Starter',
      price: 'Grátis',
      period: 'para times pequenos',
      featured: false,
      items: ['Até 3 usuários', '1 espaço de trabalho', 'Quadros em lista e colunas'],
    },
    {
      name: 'Equipe',
      price: 'R$ 49',
      period: 'por mês',
      featured: true,
      items: ['Usuários ilimitados', 'Notificações e relatórios', 'Suporte em horário comercial'],
    },
    {
      name: 'Agência',
      price: 'R$ 129',
      period: 'por mês',
      featured: false,
      items: ['Vários clientes e locais', 'Marca personalizada', 'Prioridade no suporte'],
    },
  ];

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  fillDemo(role: 'admin' | 'user'): void {
    if (role === 'admin') {
      this.form.patchValue({ email: 'admin@tasktrack.com', password: 'admin123' });
    } else {
      this.form.patchValue({ email: 'alice@gmail.com', password: 'user123' });
    }
    this.errorMessage = '';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();
    const user = this.auth.login(email || '', password || '');

    this.submitting = false;

    if (!user) {
      this.errorMessage = MSG_CONST.INVALID_CREDENTIALS;
      return;
    }

    this.toastr.success(MSG_CONST.LOGIN_OK, 'Bem-vindo');
    this.router.navigate(['/', APP_ROUTES.BOARDS, this.boards.currentBoardId() || DEFAULT_BOARD_ID]);
  }
}
