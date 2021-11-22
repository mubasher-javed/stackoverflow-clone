import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import LoginData from '../interfaces/login.interface';
import Register from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://127.0.0.1:8000/api/';

  headers = new HttpHeaders().append(
    'x-auth-token',
    localStorage.getItem('token') || ''
  );
  constructor(private http: HttpClient) {}

  loginUser(data: LoginData) {
    return this.http.post(this.URL + 'login', data);
    // .pipe(catchError(this.handleError));
  }

  registerUser(data: Register): Observable<any> {
    return this.http.post(this.URL + 'register', data, {
      observe: 'response' as 'body',
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    let user: any = atob(this.getToken().split('.')[1]);
    return JSON.parse(user);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
