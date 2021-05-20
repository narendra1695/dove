import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.url + 'profile/';

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  setAuthToken(token: string) {
    this.cookieService.set('authToken', token);
  }

  checkAuthToken() {
    return this.cookieService.check('authToken');
  }

  getID() {
    return this.cookieService.get('id');
  }

  setID(id: string) {
    this.cookieService.set('id', id);
  }

  getProfile() {
    return this.cookieService.get('profile');
  }

  setProfile(name: string, email: string, photoUrl: string) {
    this.cookieService.set(
      'profile',
      JSON.stringify({ name: name, email: email, photoUrl: photoUrl })
    );
  }

  register(id: string, name: string, email: string, photoUrl: string) {
    const profile: any = {
      id: id,
      name: name,
      email: email,
      photoUrl: photoUrl,
    };
    return this.http.patch(this.baseURL + id, { profile });
  }

  logout() {
    this.cookieService.deleteAll();
  }
}
