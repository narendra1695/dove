import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DovesService {
  baseURL: string = environment.url + 'profile/';

  constructor(private http: HttpClient) {}

  getAllDoves() {
    return this.http.get(this.baseURL);
  }
}
