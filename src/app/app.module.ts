import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AdminModule } from './pages/admin/admin.module';
import { HomeModule } from './pages/home/home.module';
import { UserModule } from './pages/user/user.module';

//cấu hình route
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpApiInterceptor } from './_core/services/httpApi.interceptor';
import { isLoginGuard } from './_core/services/Guard/isLogin.guard';
import { isAuthenticatedGuard } from './_core/services/Guard/isAuthenticated.guard';

const appRoutes: Routes = [
  { path: 'home', loadChildren: () => HomeModule },
  { path: 'user', loadChildren: () => UserModule },
  { path: 'admin', loadChildren: () => AdminModule, canActivate: [isLoginGuard, isAuthenticatedGuard] },
  { path: '**', redirectTo: '' }
]

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot(appRoutes, routerOptions)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: httpApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
