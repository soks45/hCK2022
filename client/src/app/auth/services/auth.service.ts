import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of, tap } from 'rxjs';
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

  signInAsUser(email: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/user/login`, { email, password })
      .pipe(
        map((x) => {
          console.log(x);
          this._user.next({
            ...x
          });
          this.router.navigate([pages.defaultPage])
          return x;
        })
      );
  }

  signUpAsUser(email: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/user/registration`, { email, password })
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

  signInAsOrganization(inn: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/organization/login`, { inn, password })
      .pipe(
        tap((x) => {
          this.router.navigate([pages.organizationPage])
          return x;
        })
      );
  }

  signUpAsOrganization(username: string, password: string) {
    return this.http
      .post<EmployeeLoginResult>(`${this.apiUrl}/organization/registration`, { username, password })
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
