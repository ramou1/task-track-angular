import { UserModel } from "./user-model";

export interface TaskModel {
    id?: string;
    title?: string;
    description?: string;
    expirationDate?: Date;
    registerDate?: Date;
    status?: number;
    progress?: number;
    responsible?: UserModel;
    responsibleId?: string;
    boardId?: string;
}