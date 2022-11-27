import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AppCookiesService {
  constructor(private cookie: CookieService) {
  }

  getSessionTokenData(): string | undefined {
    const token = this.cookie.get('ADMIN_JWT');

    if (!token) {
      return;
    }
    console.log(this.cookie.getAll());

    return token;
  }

  private get(name: string): string | undefined {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }

    return undefined;
  }
}
