import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from '../../core/services/users/users.service';
import { SharedService } from '../../core/services/shared/shared.service';
import { AdminUser } from 'src/app/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  users: AdminUser[] = [];
  displayedColumns: string[] = ['select', 'first_name', 'last_name', 'email', 'groups'];
  destroy$: Subject<any> = new Subject();
  selection = new SelectionModel<AdminUser>(true, []);

  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.loading = false;
      this.users = data;
    });
  }

  formatGroups(array): void {
    return array && array.length > 0 ? array.toString() : '-';
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.users.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AdminUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  downloadCSV(): void {
    if (this.selection && this.selection.selected.length > 0) {
      this.sharedService.exportAsExcelFile(this.selection.selected, 'Users table');
      this.selection.clear();
    } else {
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 5 * 1000,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'alert.component',
  templateUrl: 'alert.component.html',
})
export class AlertComponent {}
