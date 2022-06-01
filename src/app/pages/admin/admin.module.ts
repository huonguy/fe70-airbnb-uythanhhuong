import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';

import { PrimengModule } from 'src/app/_core/common/_modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';

//config route
import { RouterModule, Routes } from '@angular/router'
import { ProductService } from 'src/app/_core/services/productService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { LocationManagementComponent } from './location-management/location-management.component'
const adminRoute: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: 'manageuser', component: UserManagementComponent },
      { path: 'manageroom', component: RoomManagementComponent },
      { path: 'managelocation', component: LocationManagementComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserManagementComponent,
    RoomManagementComponent,
    LocationManagementComponent
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
  ],
  providers: [
    ProductService,
    MessageService,
    ConfirmationService
  ]
})
export class AdminModule { }
