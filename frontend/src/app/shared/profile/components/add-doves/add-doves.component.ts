import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth.service';
import { DovesService } from 'src/app/utils/doves.service';

import { FollowerService } from '../../../../utils/follower.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doves',
  templateUrl: './add-doves.component.html',
  styleUrls: ['./add-doves.component.scss'],
})
export class AddDovesComponent implements OnInit {
  doves: any = [];
  following: boolean = false;
  loading: boolean = false;
  page: number = 1;

  constructor(
    private doveService: DovesService,
    private localAuth: AuthService,
    private followerService: FollowerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDoves();
  }

  getDoves() {
    this.loading = true;

    this.doveService.getAllDoves().subscribe(
      (res: any) => {
        this.loading = false;

        this.doves = res;
        this.doves = this.doves.filter(
          (res: any) => res['_id'] !== this.localAuth.getID()
        );
        this.isFollowing();
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

  isFollowing() {
    this.loading = true;

    this.followerService.getFollowersByProID(this.localAuth.getID()).subscribe(
      (res: any) => {
        for (var i = 0; i <= res.length - 1; i -= -1) {
          for (var j = 0; j <= this.doves.length - 1; j -= -1) {
            if (res[i]['followerID'] == this.doves[j]['_id']) {
              this.doves[j]['following'] = true;
            }
          }
        }
        this.loading = false;
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

  follow(id: string) {
    this.loading = true;

    this.followerService.addFollower(this.localAuth.getID(), id).subscribe(
      (res: any) => {
        this.loading = false;
        this.followerService.followerData.push(res[0]);
        this.followerService.follow.next(this.followerService.followerData);

        for (var i = 0; i <= this.doves.length - 1; i -= -1) {
          if (this.doves[i]['_id'] == id) {
            this.doves[i]['following'] = true;
          }
        }

        this.toastr.success('Voila! Dove added to your net', 'Success', {
          timeOut: 3000,
          easing: 'ease-in',
          easeTime: 300,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
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

  unFollow(id: string) {
    this.loading = true;

    this.followerService.unFollow(this.localAuth.getID(), id).subscribe(
      () => {
        this.followerService.followerData =
          this.followerService.followerData.filter(
            (res: any) => res['followerID'] !== id
          );
        this.followerService.follow.next(this.followerService.followerData);

        for (var i = 0; i <= this.doves.length - 1; i -= -1) {
          if (this.doves[i]['_id'] == id) {
            this.doves[i]['following'] = false;
          }
        }

        this.loading = false;

        this.toastr.success('Voila! Dove removed from your net', 'Success', {
          timeOut: 3000,
          easing: 'ease-in',
          easeTime: 300,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
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
