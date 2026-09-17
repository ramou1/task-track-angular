import { NbComponentStatus } from '@nebular/theme';

export const TASK_STATUS = {
  PENDING: 0,
  IN_PROGRESS: 1,
  DONE: 2,
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export function getStatusName(status?: number): string {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'Pendente';
    case TASK_STATUS.IN_PROGRESS:
      return 'Em andamento';
    case TASK_STATUS.DONE:
      return 'Concluída';
    default:
      return 'Não iniciado';
  }
}

export function getStatusColor(status?: number): NbComponentStatus {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'warning';
    case TASK_STATUS.IN_PROGRESS:
      return 'info';
    case TASK_STATUS.DONE:
      return 'success';
    default:
      return 'basic';
  }
}

export function getRoleName(role?: string): string {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'user':
      return 'Usuário';
    default:
      return 'Desconhecido';
  }
}

export function getRoleColor(role?: string): NbComponentStatus {
  switch (role) {
    case 'admin':
      return 'info';
    case 'user':
      return 'success';
    default:
      return 'basic';
  }
}

export function getPersonColor(id?: string): string {
  const palette = ['#9d50dd', '#579bfc', '#00c875', '#fdab3d', '#e2445c', '#037f4c', '#323259'];
  const index = Number(id || 0) % palette.length;
  return palette[Number.isNaN(index) ? 0 : index];
}

export function getInitials(name?: string): string {
  if (!name) {
    return 'U';
  }

  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
