import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirectiveTsDirective } from './shared/dropdown.directive.ts.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { AlertComponent } from './shared/alert/alert.component';
import { MemberAuthGuard } from './isAdmin.guard';
import { PlatinumMemberAuthGuard } from './isPlatinumMember.guard';
import { SuperAdminGuard } from './isSuper.guard';
import { RecipeService } from './recipe/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirectiveTsDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    MemberAuthGuard,
    PlatinumMemberAuthGuard,
    SuperAdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
