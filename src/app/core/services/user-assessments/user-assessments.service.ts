import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Assessment } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserAssessmentsService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUserAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.baseUrl}/userassessments`);
  }

  getUserAssessmentReport(id) {
    return this.http.get<any[]>(`${this.baseUrl}/userassessment/graph`, { params: { id } });
  }
}