import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { DashboardComponent } from './dashboard.component';
import { UserAssessmentsService } from '../../core/services/user-assessments/user-assessments.service';
import { GraphDialogComponent } from '../../components/modals/graph-dialog/graph-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    GraphDialogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatCardModule,
    MatButtonModule,
    ChartsModule
  ],
  exports: [ RouterModule ],
  providers: [ UserAssessmentsService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  entryComponents:[ 
    GraphDialogComponent,
  ]
})
export class DashboardModule { }