import { UserModel } from './user-model';

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  author?: UserModel;
  text: string;
  createdAt: Date;
}
