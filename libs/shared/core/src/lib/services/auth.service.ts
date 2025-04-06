import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private readonly _cookieService = inject(CookieService);
  private readonly _router = inject(Router);

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this._cookieService.get(this.TOKEN_KEY) || null;
  }

  setToken(token: string): void {
    // Set cookie with secure options
    this._cookieService.set(this.TOKEN_KEY, token, {
      secure: true,
      sameSite: 'Strict',
      path: '/'
    });
  }

  removeToken(): void {
    this._cookieService.delete(this.TOKEN_KEY);
  }

  logout(): void {
    this.removeToken();
    this._router.navigate(['/login']);
  }
}
