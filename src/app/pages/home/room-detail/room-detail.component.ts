import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { amenities } from 'src/app/_core/constants/amenities';
import { Review } from 'src/app/_core/models/review';
import { Room } from 'src/app/_core/models/room';
import { SearchInfo, searchInfo } from 'src/app/_core/models/search-info';
import { ReviewService } from 'src/app/_core/services/review.service';
import { RoomService } from 'src/app/_core/services/room.service';
import { TransformDataService } from 'src/app/_core/services/transform-data.service';
import { Destroyable } from '../../_directives/Destroyable.directive';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})

export class RoomDetailComponent extends Destroyable implements OnInit {
  argAmenity = amenities

  roomDetail: Room;
  roomId: string;
  arrReview: Review[];

  showMoreDescription: boolean = false;
  searchInfo: SearchInfo;

  items: MenuItem[];
  home: MenuItem;

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private reviewService: ReviewService, private router: Router, private location: Location, private transformService: TransformDataService) {
    super()

  }

  ngOnInit(): void {
    this.atvRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.roomId = params['id'];
      console.log('roomId', this.roomId);
    })

    // láy thong tin chi tiết phòng
    this.roomService.layThongTinChiTietPhong(this.roomId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log('thong tin chi tiet phong', result);
        this.roomDetail = result;
      },
      error: err => {
        console.log({ err });
      }
    })

    //lấy danh sách đánh giá theo phòng
    this.reviewService.layDanhSachDanhGiaTheoPhong(this.roomId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log('danh sách đánh giá', result);
        this.arrReview = result;
      },
      error: err => {
        console.log({ err });
      }
    })

    //lấy kết quả tìm kiếm phòng
    this.transformService.asData.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: SearchInfo) => {
        console.log('ket qua tim phong', result);
        if (null === result)
          this.searchInfo = searchInfo;
        else
          this.searchInfo = result;
      },
      error: err => {
        console.log({ err })
      }
    })
  }

  clickShowMore(): void {
    this.showMoreDescription = !this.showMoreDescription;
  }
}
