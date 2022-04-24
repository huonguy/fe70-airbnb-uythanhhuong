import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserManagementComponent,
    RoomManagementComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminModule { }
