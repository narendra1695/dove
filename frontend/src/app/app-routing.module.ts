import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyPostsComponent } from './shared/profile/components/my-posts/my-posts.component';
import { LoggedGuard } from './utils/guards/logged.guard';

const routes: Routes = [
  // pre-login
  { path: '', component: LoginComponent, canActivate: [LoggedGuard] },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-posts', component: MyPostsComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
