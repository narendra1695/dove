import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth.service';
import { FollowerService } from 'src/app/utils/follower.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-following-profile',
  templateUrl: './following-profile.component.html',
  styleUrls: ['./following-profile.component.scss'],
})
export class FollowingProfileComponent implements OnInit {
  loading: boolean = false;

  name: string;
  email: string;
  img: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private followerService: FollowerService,
    private localAuth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFollowingProfile();
  }

  getFollowingProfile() {
    this.loading = true;

    this.followerService.getFollowingProfile(this.data['id']).subscribe(
      (res: any) => {
        this.loading = false;

        this.name = res[0]['name'];
        this.email = res[0]['email'];
        this.img = res[0]['photoUrl'];
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
