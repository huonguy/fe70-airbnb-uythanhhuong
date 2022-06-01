import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/_core/models/room';
import { RoomService } from 'src/app/_core/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  subParam!: Subscription;
  locationId: string = '';

  arrRoom: Room[];

  cp: number = 1;
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(params => {
      this.locationId = params['locationId'];
      console.log('location id', this.locationId);
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
    this.router.navigate([`roomdetail/${roomDetail._id}`]);
  }

}
