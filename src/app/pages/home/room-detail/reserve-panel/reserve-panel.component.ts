import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Booking } from 'src/app/_core/models/booking';
import { Room } from 'src/app/_core/models/room';
import { RoomService } from 'src/app/_core/services/room.service';

@Component({
  selector: 'app-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss']
})
export class ReservePanelComponent implements OnInit {
  @Input() roomDetail: Room;
  @Input() reviewlength: number;
  @Input() searchInfo: any;

  checkIn!: Date;
  checkOut!: Date;
  adultsNum: number = 0;
  childrenNum: number = 0;
  infantsNum!: number;
  petsNum!: number;

  serviceFee: number = 250000;

  bookingInfo!: Booking;

  constructor(private roomService: RoomService, private messageService: MessageService, private router: Router, private location: Location) {

  }

  ngOnInit(): void {
    this.checkIn = this.searchInfo.checkIn;
    this.checkOut = this.searchInfo.checkOut;
    this.adultsNum = this.searchInfo.adultsNum;
    this.childrenNum = this.searchInfo.childrenNum;
    this.infantsNum = this.searchInfo.infantsNum;
    this.petsNum = this.searchInfo.petsNum;
  }

  datPhong(): void {
    this.bookingInfo = {
      roomId: this.roomDetail._id,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    };

    this.roomService.datPhong(this.bookingInfo).subscribe({
      next: result => {
        console.log('dat phong', result);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message, life: 3000 })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 })
      }
    })
  }

  totalGuests(value1: number, value2: number): number {
    return Number(value1) + Number(value2);
  }

  calculateDiff(cInDate: Date, cOutDate: Date) {
    var date1 = new Date(cInDate);
    let date2 = new Date(cOutDate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days.toString());
  }
}
