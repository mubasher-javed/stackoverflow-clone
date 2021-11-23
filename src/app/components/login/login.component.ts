import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import LoginData from 'src/app/interfaces/login.interface';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  openRegisterDialog() {
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent, { width: '40vw' });
  }
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
        this.dialog.closeAll();
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
