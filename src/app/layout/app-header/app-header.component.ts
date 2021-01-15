import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  menuList: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.menuList = [
      {
        link: '/dashboard',
        label: 'Dashboard',
        hidden: false
      },
      {
        link: '/users',
        label: 'Users',
        hidden: this.authService.currentUserValue.role === 'User'
      },
    ];
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
