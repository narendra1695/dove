import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/auth.service';
import { PostsService } from 'src/app/utils/posts.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  posts: any = [];
  loading: boolean = false;

  profile: any = [];
  page: number = 1;

  constructor(
    private postService: PostsService,
    private localAuth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getProfile();
  }

  getProfile() {
    this.profile = JSON.parse(this.localAuth.getProfile());
  }

  getPosts() {
    this.loading = true;

    this.postService.getAllPostsByProfileID(this.localAuth.getID()).subscribe(
      (res: any) => {
        this.loading = false;
        this.posts = res.reverse();
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
