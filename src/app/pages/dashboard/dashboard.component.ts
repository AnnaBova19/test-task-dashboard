import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserAssessmentsService } from '../../core/services/user-assessments/user-assessments.service';
import { Assessment } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { GraphDialogComponent } from '../../components/modals/graph-dialog/graph-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  assessments: Assessment[] = [];
  destroy$: Subject<any> = new Subject();

  constructor(
    private userAssessmentsService: UserAssessmentsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userAssessmentsService.getUserAssessments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loading = false;
        this.assessments = data;
    });
  }

  showReport(report): void {
    this.userAssessmentsService.getUserAssessmentReport(report.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loading = false;
        const dialogRef = this.dialog.open(GraphDialogComponent, {
          width: '500px',
          height: 'auto',
          data: {title: report.name, graph: data}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
