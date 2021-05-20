import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDovesComponent } from './components/add-doves/add-doves.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AuthService } from 'src/app/utils/auth.service';
import { FollowerService } from 'src/app/utils/follower.service';
import { ToastrService } from 'ngx-toastr';
import { FollowersComponent } from './components/followers/followers.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;

  name: string;
  email: string;
  img: string;

  followersCount: number = 0;
  followingCount: number = 0;

  constructor(
    private dialog: MatDialog,
    private localAuth: AuthService,
    private followerService: FollowerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFollowersData();
    this.getFollowingCount();
  }

  getProfile() {
    let profile: any = JSON.parse(this.localAuth.getProfile());
    this.name = profile['name'];
    this.email = profile['email'];
    this.img = profile['photoUrl'];
  }

  getFollowersData() {
    this.loading = true;

    this.followerService.getFollowersData(this.localAuth.getID()).subscribe(
      (res: any) => {
        this.loading = false;
        this.followersCount = res.length;
      },
      (error: any) => {
        this.loading = false;

        this.toastr.error('Something went wrong', 'Failed', {
          timeOut: 3000,
          easing: 'ease-in',
          easeTime: 300,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      }
    );
  }

  getFollowingCount() {
    this.loading = true;

    this.followerService.followListner().subscribe(
      (res: any) => {
        this.loading = false;
        this.followingCount = res.length;
      },
      (error: any) => {
        this.loading = false;

        this.toastr.error('Something went wrong', 'Failed', {
          timeOut: 3000,
          easing: 'ease-in',
          easeTime: 300,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      }
    );
  }

  newPost() {
    this.dialog.open(NewPostComponent, {
      width: '576px',
      autoFocus: false,
    });
  }

  addDoves() {
    this.dialog.open(AddDovesComponent, {
      width: '576px',
      autoFocus: false,
    });
  }

  showFollowers() {
    this.dialog.open(FollowersComponent, {
      width: '352px',
      autoFocus: false,
    });
  }
}
