import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { LocationManagementComponent } from './location-management/location-management.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component'

import { PrimengModule } from 'src/app/_core/common/_modules/primeng/primeng.module';


//config route
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const adminRoute: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: 'manageuser', component: UserManagementComponent },
      { path: 'manageroom', component: RoomManagementComponent },
      { path: 'managelocation', component: LocationManagementComponent },
      { path: 'manageticket', component: TicketManagementComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserManagementComponent,
    RoomManagementComponent,
    LocationManagementComponent,
    TicketManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    HttpClientModule,
    RouterModule.forChild(adminRoute)
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminModule { }
