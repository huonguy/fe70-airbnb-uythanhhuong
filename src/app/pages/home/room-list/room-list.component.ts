import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/_core/models/room';
import { Ticket } from 'src/app/_core/models/ticket';
import { RoomService } from 'src/app/_core/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {
  subParam!: Subscription;
  subParam2!: Subscription;

  locationId: string = '';

  arrRoom: Room[];

  cp: number = 1;
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"

  checkIn!: Date
  checkOut!: Date;
  adultsNum!: number;
  childrenNum!: number;
  infantsNum!: number;
  petsNum!: number;

  searchInfo: any = {};

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private router: Router) { }


  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(params => {
      this.locationId = params['locationId'];
      console.log('location id', this.locationId);
    })

    this.subParam2 = this.atvRoute.queryParams.subscribe((params) => {
      console.log('query params', params)

      if (Object.keys(params).length != 0) {
        this.searchInfo = params;
      } else {
        this.searchInfo = {
          checkIn: new Date(),
          checkOut: new Date(),
          adultsNum: 0,
          childrenNum: 0,
          infantsNum: 0,
          petsNum: 0
        }
      }
      this.checkIn = this.searchInfo.checkIn;
      this.checkOut = this.searchInfo.checkOut;
    })

    this.roomService.layDanhSachPhongTheoViTri(this.locationId).subscribe({
      next: result => {
        console.log('danh sach phong theo vi tri', result);
        this.arrRoom = result;
      },
      error: err => {
        console.log({ err })
      }
    })
  }

  goRoomDetail(roomDetail: Room): void {
    this.router.navigate([`roomdetail/${roomDetail._id}`], {
      queryParams: this.searchInfo, queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    if (this.subParam) {
      this.subParam.unsubscribe();
    }

    if (this.subParam2) {
      this.subParam2.unsubscribe();
    }
  }

}
