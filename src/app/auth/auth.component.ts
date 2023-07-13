import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoles } from './user.enum.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLogInMode = true;
  isLoading = false;
  error = false;

  roleArray = Object.keys(UserRoles)
    .map((key) => UserRoles[key])
    .filter((key) => isNaN(Number(key)));

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const role = form.value.role;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLogInMode) {
      authObs = this.authService.login(username, password);
    } else {
      authObs = this.authService.signup(username, email, password, role);
    }

    authObs.subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/recipe']);
        if (this.error == false) {
          if (this.isLogInMode) {
            this.toastr.success('Successfully Logged in');
          } else {
            this.toastr.success('Successfully Signed Up');
          }
        }

      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.toastr.error(errorMessage);
        this.error = true;
        this.isLoading = false;
      },
    });


    console.log(this.error);

    form.reset();
  }
}
