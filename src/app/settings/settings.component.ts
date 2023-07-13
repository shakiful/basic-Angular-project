import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { UserRoles } from '../auth/user.enum.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isLoading = false;
  error: string = null;

  roleArray = Object.keys(UserRoles)
    .map((key) => UserRoles[key])
    .filter((key) => isNaN(Number(key)));

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const role = form.value.role;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<any>;

    this.isLoading = true;

    authObs = this.authService.update(username, email, password, role);

    authObs.subscribe({
      next: (data) => {
        console.log(data);
        console.log('User updated successfully');
        this.isLoading = false;
        this.router.navigate(['recipe']);
      },
      error: (error) => {
        console.error('Failed to update user', error);
      },
    });
    // authObs.subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipe']);
    //   },
    //   error: (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   },
    // });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  onCancel() {
    this.router.navigate(['recipe']);
  }
}
