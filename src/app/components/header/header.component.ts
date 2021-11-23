import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  handleLogout() {
    localStorage.removeItem('token');
    location.reload();
  }
  get username() {
    let user: any = atob(this.getToken().split('.')[1]);
    user = JSON.parse(user);
    return user['username'];
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, { width: '30vw' });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent, {
      width: '40vw',
    });
  }

  get loggedIn() {
    return this.userService.isLoggedIn();
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
}
