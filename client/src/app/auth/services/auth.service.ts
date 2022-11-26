import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '../../models/employee';
import { AppCookiesService } from './cookie-service';
import { Organization } from '../../models/organization';

interface EmployeeLoginResult extends Employee {
  accessToken: string;
}

interface OrganizationLoginResult extends Organization {
  accessToken: string;
}

enum pages {
  login = 'login',
  defaultPage = 'main-page',
  organizationPage = 'organization-page'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api`;
  private _user = new BehaviorSubject<Employee | Organization | null>(null);
  user$ = this._user.asObservable();


  constructor(private router: Router, private http: HttpClient, private cookies: AppCookiesService) {

  }

  signInAsUser(username: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/login/`, { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            ...x
          });
          this.router.navigate([pages.defaultPage])
          return x;
        })
      );
  }

  signUpAsUser(username: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/signup/`, { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            ...x
          });
          this.router.navigate([pages.defaultPage])
          return x;
        })
      );
  }

  signInAsOrganization(username: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/login/`, { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            ...x
          });
          this.router.navigate([pages.organizationPage])
          return x;
        })
      );
  }

  signUpAsOrganization(username: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/signup/`, { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            ...x
          });
          this.router.navigate([pages.organizationPage])
          return x;
        })
      );
  }

  logout() {
    this.http
      .post<unknown>(`${this.apiUrl}/logout`, {})
      .pipe(
        finalize(() => {
          this._user.next(null);
          this.router.navigate([pages.login]);
        })
      )
      .subscribe();
  }

  sessionToken(): Observable<any> {
    if (!this.cookies.getSessionTokenData()) {
      return from(this.router.navigate([pages.login]))
    }

    return of(null);
  }
}
