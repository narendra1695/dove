import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { FollowerService } from '../../../../utils/follower.service';
import { ToastrService } from 'ngx-toastr';
import { FollowingProfileComponent } from './components/following-profile/following-profile.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  data: any = [];
  loading: boolean = false;

  constructor(
    private followerService: FollowerService,
    private localAuth: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.followerService.getFollowersByProID(this.localAuth.getID()).subscribe(
      (res: any) => {
        this.loading = false;
        this.followerService.followerData = res;
        this.followerService.follow.next(this.followerService.followerData);
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
    this.getPostsFromFollowers();
  }

  getPostsFromFollowers() {
    this.loading = true;

    this.followerService.followListner().subscribe(
      (res: any) => {
        this.loading = false;
        this.data = res.reverse();
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

  checkProfile(id: string) {
    this.dialog.open(FollowingProfileComponent, {
      width: '352px',
      data: { id },
      autoFocus: false,
    });
  }
}
