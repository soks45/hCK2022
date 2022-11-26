import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../../models/user';
import { AppCookiesService } from './cookie-service';

interface LoginResult extends User {
  accessToken: string;
  refreshToken: string;
}

enum pages {
  login = 'login',
  defaultPage = 'main-page',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api`;
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();


  constructor(private router: Router, private http: HttpClient, private cookies: AppCookiesService) {

  }

  login(username: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');


    return this.http
      .post<LoginResult>(`${this.apiUrl}/login`, { username, password }, { headers })
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
    };

    return of(null);
  }
}
