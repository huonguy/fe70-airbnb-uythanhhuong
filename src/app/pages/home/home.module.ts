import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './_components/carousel/carousel.component';
import { RoomSearchComponent } from './_components/room-search/room-search.component';
import { ReservePanelComponent } from './room-detail/reserve-panel/reserve-panel.component';

import { PrimengModule } from 'src/app/_core/common/_modules/primeng/primeng.module';
import { NgxPaginationModule } from 'ngx-pagination';

//cấu hình route cho /home
import { RouterModule, Routes } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

const homeRoutes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'roomlist/:locId', component: RoomListComponent },
      { path: 'roomdetail/:id', component: RoomDetailComponent }
    ]
  }
]

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HeaderComponent,
    FooterComponent,
    RoomListComponent,
    RoomDetailComponent,
    HomeComponent,
    CarouselComponent,
    RoomSearchComponent,
    ReservePanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    ScrollingModule,
    NgxPaginationModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [
    HomeLayoutComponent,
    HeaderComponent
  ],
  providers: [
    CookieService
  ]
})
export class HomeModule { }
