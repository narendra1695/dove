import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/utils/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private localAuth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  signInWithGoogle(): void {
    this.loading = true;

    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: any) => {
        this.loading = true;

        let authToken: string = res['authToken'];
        if (authToken) {
          this.localAuth
            .register(res['id'], res['name'], res['email'], res['photoUrl'])
            .subscribe(
              () => {
                this.loading = false;

                this.localAuth.setID(res['id']);
                this.localAuth.setProfile(
                  res['name'],
                  res['email'],
                  res['photoUrl']
                );
                this.localAuth.setAuthToken(authToken);
                this.router.navigateByUrl('/dashboard');

                this.toastr.success(
                  'Voila! You are now a Dove member',
                  'Success',
                  {
                    timeOut: 3000,
                    easing: 'ease-in',
                    easeTime: 300,
                    progressBar: true,
                    progressAnimation: 'increasing',
                    positionClass: 'toast-top-left',
                  }
                );
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
      })
      .catch((error: any) => {
        this.loading = false;

        this.toastr.warning(error.error, 'Notice', {
          timeOut: 3000,
          easing: 'ease-in',
          easeTime: 300,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      });
  }
}
