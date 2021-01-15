import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { UsersComponent } from './users.component';
import { UsersService } from '../../core/services/users/users.service';
import { SharedService } from '../../core/services/shared/shared.service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [ RouterModule ],
  providers: [ UsersService, SharedService ],
})
export class UsersModule { }