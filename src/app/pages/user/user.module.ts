import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { HomeModule } from '../home/home.module';

//config route cho /user
import { RouterModule, Routes } from '@angular/router'
import { NgBootstrapModule } from 'src/app/_core/common/_modules/ngbootstrap/ngbootstrap.module';
import { PrimengModule } from 'src/app/_core/common/_modules/primeng/primeng.module';

const userRoute: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile/:id', component: UserProfileComponent }
    ]
  }
]

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeModule,
    NgBootstrapModule,
    PrimengModule,
    RouterModule.forChild(userRoute)
  ],
  exports: [
    UserLayoutComponent
  ]
})
export class UserModule { }
