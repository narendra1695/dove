import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  baseURL: string = environment.url;

  public followerData: any = [];
  public follow = new Subject<any>();

  constructor(private http: HttpClient) {}

  followListner() {
    return this.follow.asObservable();
  }

  getFollowersByProID(proID: string) {
    return this.http.get(this.baseURL + 'follower/' + proID);
  }

  getFollowersData(proID: string) {
    return this.http.get(this.baseURL + proID);
  }

  getFollowingProfile(proID: string) {
    return this.http.get(this.baseURL + 'profile/' + proID);
  }

  addFollower(proID: string, followerID: string) {
    return this.http.post(this.baseURL + 'follower/' + proID, { followerID });
  }

  unFollow(proID: string, followerID: string) {
    return this.http.delete(
      this.baseURL + 'follower/' + proID + '/' + followerID
    );
  }
}
