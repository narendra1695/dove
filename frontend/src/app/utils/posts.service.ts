import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseURL: string = environment.url + 'post/';

  public postData: any = [];
  public post = new Subject<any>();

  constructor(private http: HttpClient) {}

  profileListner() {
    return this.post.asObservable();
  }

  getAllPostsByProfileID(proID: string) {
    return this.http.get(this.baseURL + proID);
  }

  insertPost(proID: string, post: string) {
    return this.http.post(this.baseURL + proID, { post });
  }
}
