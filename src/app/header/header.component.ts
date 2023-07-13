import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoles } from '../auth/user.enum.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  users: any[];
  access: string;

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.access = user.role.toString()
    });

  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onRetrieveUsers() {
    this.authService.retrieveUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }
  onSettings() {
    this.router.navigate(['settings']);
  }

  onDelete() {
    this.authService.delete().subscribe(
      () => {
        console.log('User deleted successfully');
        this.onLogout();
      },
      (error) => {
        console.error('Failed to delete user', error);
      }
    );
  }

  collapsed = true;
}
