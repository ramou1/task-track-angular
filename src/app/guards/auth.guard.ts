import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MockBoardService } from '../../services/mock-board.service';
import { APP_ROUTES, DEFAULT_BOARD_ID } from '../constants/routes.const';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.LOGIN]);
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const boards = inject(MockBoardService);

  return auth.isAuthenticated()
    ? router.createUrlTree(['/', APP_ROUTES.BOARDS, boards.currentBoardId() || DEFAULT_BOARD_ID])
    : true;
};
