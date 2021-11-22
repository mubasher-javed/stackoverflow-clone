import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import LoginData from 'src/app/interfaces/login.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  handleSubmit() {
    const credentials: LoginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.userService.loginUser(credentials).subscribe(
      (res: any) => {
        localStorage.setItem('token', res['token']);
        this.loginForm.reset();
        // close modal with code

        this.router.navigateByUrl('/');
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          const email = this.loginForm.get('email');
          email?.setErrors({ serverError: err.error });
        }
      }
    );
  }
}
