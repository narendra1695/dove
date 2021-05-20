import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/utils/auth.service';
import { PostsService } from 'src/app/utils/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  form: FormGroup;
  count: number = 0;
  loading: boolean = false;

  constructor(
    private postService: PostsService,
    private localAuth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      post: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  addPost() {
    if (this.form.invalid) {
      return;
    } else {
      this.loading = true;

      this.postService
        .insertPost(this.localAuth.getID(), this.form.value.post)
        .subscribe(
          (res: any) => {
            this.loading = false;

            this.postService.postData.push(res[0]);
            this.postService.post.next(this.postService.postData);
            this.dialog.closeAll();

            this.toastr.success('Voila! Post created', 'Success', {
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
}
