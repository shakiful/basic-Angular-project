import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { UserRoles } from './user.enum.model';
import { JwtService } from './jwt.service';

export interface AuthResponseData {
  accessToken: string;
  username: string;
  email: string;
  role: UserRoles;
  createdAt: Date;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  accessPermission = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {}

  inLogin = null;

  signup(username: string, email: string, password: string, role: string) {
    this.inLogin = false;
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/users', {
        username,
        email,
        password,
        role: role.toLowerCase(),
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.username,
            resData.email,
            resData.role,
            resData.accessToken,
            resData.createdAt,
            +resData.id
          );
        })
      );
  }
  login(username: string, password: string) {
    this.inLogin = true;
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/auth/login', {
        username,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.username,
            resData.role,
            resData.accessToken,
            resData.createdAt,
            +resData.id
          );
        })
      );
  }

  retrieveUsers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.user.value.accessToken}`
    );

    return this.http
      .get<any[]>('http://localhost:3000/api/v1/users', { headers })
      .pipe(catchError(this.handleError));
  }

  autoLogin() {
    const userData: {
      username: string;
      email: string;
      role: UserRoles;
      accessToken: string;
      createdAt: Date;
      id: number;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.username,
      userData.email,
      userData.role,
      +userData.id,
      userData.accessToken,
      userData.createdAt
    );
    if (loadedUser.accessToken) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  update(username: string, email: string, password: string, role: string) {
    const decodedToken = this.jwtService.decodeToken(
      this.user.value.accessToken
    );
    const id = decodedToken.sub;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.user.value.accessToken}`
    );

    return this.http
      .put<AuthResponseData>(
        `http://localhost:3000/api/users/${id}`,
        {
          username,
          email,
          password,
          role: role.toLowerCase(),
        },
        { headers }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.username,
            resData.role,
            resData.accessToken,
            resData.createdAt,
            +resData.id
          );
        })
      );
  }

  delete() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.user.value.accessToken}`
    );

    const decodedToken = this.jwtService.decodeToken(
      this.user.value.accessToken
    );
    const id = decodedToken.sub;
    return this.http
      .delete(`http://localhost:3000/api/users/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  settings() {
    this.router.navigate(['settings']);
  }

  private handleAuthentication(
    username: string,
    email: string,
    role: UserRoles,
    accessToken: string,
    createdAt: Date,
    id: number
  ) {
    const user = new User(username, email, role, id, accessToken, createdAt);
    if (this.inLogin) {
      const decodedToken = this.jwtService.decodeToken(accessToken);

      role = decodedToken.role;
      user.role = role;
      this.user.next(user);
    }

    console.log(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an Unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    if (errorRes.status === 400) {
      errorMessage = errorRes.error.message; // properly show the error message
    }
    if (errorRes.status === 401) {
      console.log(errorRes);
      errorMessage = errorRes.message;
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email address not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(() => errorMessage);
  }
}
