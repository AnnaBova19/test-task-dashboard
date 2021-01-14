import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../core/services/users/users.service';
import { AdminUser } from 'src/app/models';
import { ɵAnimationRendererFactory } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  users: AdminUser[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'groups'];
  destroy$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
