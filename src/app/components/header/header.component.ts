import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

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

  get loggedIn() {
    return this.userService.isLoggedIn();
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
}
