import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, CreateUserComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [UserComponent],
})
export class UserModule {}
