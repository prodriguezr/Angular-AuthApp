import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth-response';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  `
    * {
      margin: 15px;
    }
  `
  ]
})
export class DashboardComponent {
  private _user!:User;

  get user():User {
    return { ... this.authService.user };
  }

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  public logout(): void {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
