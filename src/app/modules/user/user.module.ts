import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersTableComponent } from './components/users-table/users-table.component';

@NgModule({
  declarations: [UserComponent, CreateUserComponent, UsersTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [UserComponent],
})
export class UserModule {}
