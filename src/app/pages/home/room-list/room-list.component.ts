import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { takeUntil } from 'rxjs';
import { Room } from 'src/app/_core/models/room';
import { SearchInfo, searchInfo } from 'src/app/_core/models/search-info';
import { GoogleMapService } from 'src/app/_core/services/google-map.service';
import { RoomService } from 'src/app/_core/services/room.service';
import { TransformDataService } from 'src/app/_core/services/transform-data.service';
import { GOOGLE_MAPS_KEY } from 'src/app/_core/util/config';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends Destroyable implements OnInit {
  locationId: string = '';
  locationName: string = '';

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
  location = {
    lat: 0,
    lng: 0
  };

  @ViewChild('map') mapEle: any;
  map: google.maps.Map;

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private router: Router, private transformService: TransformDataService, private googleMapService: GoogleMapService) {
    super()
  }

  ngOnInit(): void {
    this.atvRoute.queryParams.subscribe((params) => {
      this.locationId = params['locationId'];
      this.locationName = params['locationName'];

      this.googleMapService.getGeoCode(this.locationName).then((res: any) => {
        // console.log('getGeoCode', res);
        this.location = res;

        // load the google map on the browser
        let loader = new Loader({
          apiKey: GOOGLE_MAPS_KEY
        })

        return loader.load();
      })
        .then(() => {
          this.map = new google.maps.Map(this.mapEle.nativeElement, {
            center: this.location,
            zoom: 12
          });

          //marker
          const marker = new google.maps.Marker({
            position: this.location,
            map: this.map
          })
        })
        .catch((err) => {
          console.log({ err })
        })
    })

    this.roomService.layDanhSachPhongTheoViTri(this.locationId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        // console.log('danh sach phong theo vi tri', result);
        this.arrRoom = result;
      },
      error: err => {
        console.log({ err })
      }
    })

    this.transformService.asData.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: SearchInfo) => {
        // console.log('transform data', result);
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
