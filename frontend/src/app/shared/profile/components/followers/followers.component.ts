import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth.service';
import { FollowerService } from 'src/app/utils/follower.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
})
export class FollowersComponent implements OnInit {
  followers: any = [];
  loading: boolean = false;
  page: number = 1;

  constructor(
    private followerService: FollowerService,
    private localAuth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFollowers();
  }

  getFollowers() {
    this.loading = true;

    this.followerService.getFollowersData(this.localAuth.getID()).subscribe(
      (res: any) => {
        this.loading = false;
        this.followers = res;
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
}
