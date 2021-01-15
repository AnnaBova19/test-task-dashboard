import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide:boolean = true;
  loginForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  destroy$: Subject<any> = new Subject();
  menuList: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required) 
    });   
    this.menuList = [
      {
        link: 'https://www.deepersignals.com/privacy-policy',
        label: 'Privacy'
      },
      {
        link: 'https://www.deepersignals.com/terms-of-use',
        label: 'Terms'
      },
      {
        link: 'https://deepersignals.zendesk.com/hc/en-us',
        label: 'Help'
      },
    ]; 
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          this.error = error;
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
