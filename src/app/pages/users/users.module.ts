import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { UsersComponent } from './users.component';
import { UsersService } from '../../core/services/users/users.service';

import { MatTableModule } from '@angular/material/table';

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

    MatTableModule    
  ],
  exports: [ RouterModule ],
  providers: [ UsersService ],
})
export class UsersModule { }