import { CommonModule } from '@angular/common';
import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTagModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { firstValueFrom } from 'rxjs';
import { BasePage } from '../../../services/base-page';
import { MSG_CONST } from '../../constants/message.const';
import { getRoleColor, getRoleName, normalizeText } from '../../constants/task-status';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbDialogModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTagModule,
    NbSelectModule,
    NgxPaginationModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent extends BasePage implements OnInit {
  selectedSort: number | null = null;
  searchTerm = '';
  filteredUsers: UserModel[] = [];
  usersForm!: FormGroup;
  editing = false;
  choosedUser: UserModel | null = null;
  p = 1;

  constructor(public injector: Injector) {
    super(injector);

    effect(() => {
      this.userSrvc.users();
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.createForms();
    this.applyFilters();
  }

  createForms(): void {
    this.usersForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workplace: [''],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      registerDate: [null],
    });
  }

  searchUsers(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.p = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let list = [...this.userSrvc.users()];

    if (this.searchTerm.trim()) {
      const term = normalizeText(this.searchTerm);
      list = list.filter((user) =>
        normalizeText(`${user.name || ''} ${user.email || ''} ${user.workplace || ''}`).includes(term),
      );
    }

    if (this.selectedSort === 0) {
      list.sort((a, b) => new Date(a.registerDate || 0).getTime() - new Date(b.registerDate || 0).getTime());
    } else if (this.selectedSort === 1) {
      list.sort((a, b) => new Date(b.registerDate || 0).getTime() - new Date(a.registerDate || 0).getTime());
    }

    this.filteredUsers = list;
  }

  getRoleName = getRoleName;
  getRoleColor = getRoleColor;

  getGenderName(gender?: string): string {
    switch (gender) {
      case 'female':
        return 'Feminino';
      case 'male':
        return 'Masculino';
      default:
        return 'Não informado';
    }
  }

  openUserView(dialog: TemplateRef<unknown>, user: UserModel): void {
    this.choosedUser = user;
    this.dialogSrvc.open(dialog);
  }

  openUserDialog(dialog: TemplateRef<unknown>, user?: UserModel | null): void {
    this.editing = !!user;
    this.choosedUser = user || null;
    this.usersForm.reset();

    if (user) {
      this.usersForm.patchValue(user);
    }

    this.dialogSrvc.open(dialog);
  }

  openDeleteDialog(dialog: TemplateRef<unknown>, user: UserModel): void {
    this.choosedUser = user;
    this.dialogSrvc.open(dialog);
  }

  async deleteUser(): Promise<void> {
    if (!this.choosedUser?.id) {
      return;
    }

    try {
      await firstValueFrom(this.userSrvc.deleteUser(this.choosedUser.id));
      this.toastrSrvc.success(MSG_CONST.DELETED_USER_OK, 'Pronto');
      this.choosedUser = null;
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.DELETED_USER_ERROR, 'Erro');
      console.error(error);
    }
  }

  async addOrUpdateUser(): Promise<void> {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
      return;
    }

    try {
      const formData = this.usersForm.getRawValue() as UserModel;
      if (this.editing) {
        formData.registerDate = this.choosedUser?.registerDate;
        formData.password = this.choosedUser?.password;
      } else {
        formData.password = 'user123';
      }
      await firstValueFrom(this.userSrvc.addOrUpdateUser(formData));
      this.toastrSrvc.success(MSG_CONST.SAVE_DATA_OK, 'Pronto');
      this.usersForm.reset();
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.SAVE_DATA_ERROR, 'Erro');
      console.error(error);
    }
  }
}
