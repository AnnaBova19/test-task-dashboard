import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminUser } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.baseUrl}/users`);
  }
}
