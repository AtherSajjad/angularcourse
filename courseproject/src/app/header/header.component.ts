import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed: boolean = true;
  authObserver: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authObserver = this.authService.user.subscribe((user) => {
      this.isAuthenticated = user!=null;
      console.log(this.isAuthenticated);
      //user is null. logged out,
      //user is not null
    });
  }

  ngOnDestroy(): void {
      this.authObserver.unsubscribe();
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe((response) => {});
  }

  logout() {
    this.authService.logout();
  }
}
