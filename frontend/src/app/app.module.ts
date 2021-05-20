import { MaterialModule } from './material';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ConfirmLogoutComponent } from './shared/header/components/confirm-logout/confirm-logout.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { PostsComponent } from './pages/dashboard/components/posts/posts.component';
import { NewPostComponent } from './shared/profile/components/new-post/new-post.component';
import { AddDovesComponent } from './shared/profile/components/add-doves/add-doves.component';
import { MyPostsComponent } from './shared/profile/components/my-posts/my-posts.component';
import { FollowersComponent } from './shared/profile/components/followers/followers.component';
import { FollowingProfileComponent } from './pages/dashboard/components/posts/components/following-profile/following-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmLogoutComponent,
    ProfileComponent,
    PostsComponent,
    NewPostComponent,
    AddDovesComponent,
    MyPostsComponent,
    FollowersComponent,
    FollowingProfileComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
    ToastrModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '378570445183-t2d9ef0ok76lt33jsql0kgf90tk1i7oi.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
