import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    if (this.cookieService.check('authToken') == true) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
