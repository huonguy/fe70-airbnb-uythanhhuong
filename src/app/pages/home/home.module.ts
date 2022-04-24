import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';




@NgModule({
  declarations: [
    HomeLayoutComponent,
    HeaderComponent,
    FooterComponent,
    RoomListComponent,
    RoomDetailComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeLayoutComponent
  ]
})
export class HomeModule { }
