import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Room } from 'src/app/_core/models/room';
import { SearchInfo, searchInfo } from 'src/app/_core/models/search-info';
import { RoomService } from 'src/app/_core/services/room.service';
import { TransformDataService } from 'src/app/_core/services/transform-data.service';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends Destroyable implements OnInit {
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

  searchInfo: SearchInfo;

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private router: Router, private transformService: TransformDataService) {
    super()
  }

  ngOnInit(): void {
    this.atvRoute.params.subscribe(params => {
      this.locationId = params['locationId'];
      console.log('location id', this.locationId);
    })

    this.roomService.layDanhSachPhongTheoViTri(this.locationId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log('danh sach phong theo vi tri', result);
        this.arrRoom = result;
      },
      error: err => {
        console.log({ err })
      }
    })

    this.transformService.asData.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: SearchInfo) => {
        console.log('transform data', result);
        if (null === result)
          this.searchInfo = searchInfo;
        else
          this.searchInfo = result;
      },
      error: err => {
        console.log({ err });
      }
    });
  }

  goRoomDetail(roomDetail: Room): void {
    this.router.navigate([`roomdetail/${roomDetail._id}`]);
  }
}
