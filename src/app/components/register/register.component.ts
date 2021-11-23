import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  openLoginDialog() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, { width: '30vw' });
  }
  handleSubmit() {
    // send http request to register user endpoint
    const user = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.userService.registerUser(user).subscribe(
      (res: HttpResponse<any>) => {
        const token = res.headers.get('x-auth-token');
        if (res.status === 201) {
          localStorage.setItem('token', token || '');
          this.registerForm.reset();
          // opening login dialog for allowing user to login
          this.dialog.closeAll();
          this.dialog.open(LoginComponent, { width: '30vw' });
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          const email = this.registerForm.get('email');
          email?.setErrors({ serverError: err.error });
          return;
        }
      }
    );
  }
}
