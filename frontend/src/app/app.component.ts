import { Component } from '@angular/core';

import { AuthService } from 'src/app/utils/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public localAuth: AuthService) {}
}
