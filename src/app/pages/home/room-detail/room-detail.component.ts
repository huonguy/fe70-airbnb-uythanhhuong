import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { amenities } from 'src/app/_core/constants/amenities';
import { Review } from 'src/app/_core/models/review';
import { Room } from 'src/app/_core/models/room';
import { SearchInfo, searchInfo } from 'src/app/_core/models/search-info';
import { ReviewService } from 'src/app/_core/services/review.service';
import { RoomService } from 'src/app/_core/services/room.service';
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

  pageUrl: string = ''
  pageTitle: string = '';

  constructor(private atvRoute: ActivatedRoute, private messageService: MessageService, private roomService: RoomService, private reviewService: ReviewService, private cookie: CookieService) {
    super()
  }

  ngOnInit(): void {
    this.searchInfo = this.cookie.check('search_info') ? JSON.parse(this.cookie.get('search_info')) : searchInfo;
    // console.log('this.searchInfo', this.searchInfo);

    this.pageUrl = encodeURIComponent(document.URL);
    this.pageTitle = encodeURIComponent(document.title);

    this.atvRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.roomId = params['id'];
      // console.log('roomId', this.roomId);
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
        // console.log('danh sách đánh giá', result);
        this.arrReview = result;
      },
      error: err => {
        console.log({ err });
      }
    })
  }

  clickShowMore(): void {
    this.showMoreDescription = !this.showMoreDescription;
  }

  clickCopyLink(): void {
    navigator.clipboard.writeText(window.location.href);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Liên kết được sao chép!', life: 3000 })
  }

  clickShareMail(): void {
    let url = "mailto:?subject=%22" + this.pageTitle + "%22&body=Read%20the%20article%20%22" + this.pageTitle + "%22%20on%20" + this.pageUrl;
    this.socialWindow(url, 570, 450);
  }

  clickShareLinkedin(): void {
    let url = "https://www.linkedin.com/shareArticle?mini=true&url=" + this.pageUrl;
    this.socialWindow(url, 570, 570);
  }

  clickShareFacebook(): void {
    let url = "https://www.facebook.com/sharer.php?u=" + this.pageUrl;
    this.socialWindow(url, 570, 570);
  }

  clickShareTwitter(): void {
    let url = "https://twitter.com/intent/tweet?url=" + this.pageUrl + "&text=" + this.pageTitle;
    this.socialWindow(url, 570, 300);
  }

  clickWhatsApp(): void {
    let url = "whatsapp://send?text=" + this.pageTitle + "%20" + this.pageUrl;
    this.socialWindow(url, 570, 450);
  }

  socialWindow(url, width, height) {
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    window.open(url, "", params);
  }
}
