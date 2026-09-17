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
      return raw ? (JSON.parse(raw) as UserModel) : null;
    } catch {
      return null;
    }
  }
}
