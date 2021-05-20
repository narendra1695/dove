import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/utils/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.scss'],
})
export class ConfirmLogoutComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private localAuth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.signOut().catch((error: any) => {
      this.toastr.error(error, 'Failed', {
        timeOut: 3000,
        easing: 'ease-in',
        easeTime: 300,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-left',
      });
    });
    this.localAuth.logout();
    this.dialog.closeAll();
    this.router.navigateByUrl('/');
  }
}
