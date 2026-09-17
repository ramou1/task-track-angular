import { computed, Injectable, signal } from '@angular/core';
import { MOCK_USERS } from '../app/constants/mock.const';
import { UserModel } from '../app/models/user-model';

const STORAGE_KEY = 'tasktrack.session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<UserModel | null>(this.readSession());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());

  login(email: string, password: string): UserModel | null {
    const user = MOCK_USERS.find(
      (item) => item.email?.toLowerCase() === email.trim().toLowerCase() && item.password === password,
    );

    if (!user) {
      return null;
    }

    const session = this.toSession(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.currentUserSignal.set(session);
    return session;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserSignal.set(null);
  }

  setSession(user: UserModel): UserModel {
    const session = this.toSession(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.currentUserSignal.set(session);
    return session;
  }

  private toSession(user: UserModel): UserModel {
    const { password: _password, ...session } = user;
    return session;
  }

  private readSession(): UserModel | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const session = JSON.parse(raw) as UserModel;
      const source = MOCK_USERS.find((user) => user.id === session.id || user.email === session.email);
      if (!source) {
        return session;
      }

      const staleIdentity = !session.language;
      return {
        ...this.toSession(source),
        ...session,
        name: staleIdentity ? source.name : (session.name || source.name),
        workplace: staleIdentity ? source.workplace : (session.workplace || source.workplace),
        jobTitle: session.jobTitle || source.jobTitle,
        city: session.city || source.city,
        language: session.language || source.language || 'pt-BR',
        timezone: session.timezone || source.timezone || 'America/Sao_Paulo',
        dateFormat: session.dateFormat || source.dateFormat || 'dd/MM/yyyy',
        timeFormat: session.timeFormat || source.timeFormat || '24h',
        weekStart: session.weekStart || source.weekStart || 'monday',
        emailNotifications: session.emailNotifications ?? source.emailNotifications ?? true,
      };
    } catch {
      return null;
    }
  }
}
