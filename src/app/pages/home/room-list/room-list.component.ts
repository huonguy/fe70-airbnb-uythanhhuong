import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs';
import { Room } from 'src/app/_core/models/room';
import { SearchInfo, searchInfo } from 'src/app/_core/models/search-info';
import { GoogleMapService } from 'src/app/_core/services/google-map.service';
import { RoomService } from 'src/app/_core/services/room.service';
import { GOOGLE_MAPS_KEY } from 'src/app/_core/util/config';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends Destroyable implements OnInit {
  locationId: string = '';

  arrRoom: Room[];
  updatedArrRoom: Room[];

  cp: number = 1;
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"

  //filter by criteria
  filteredByMinPrice: number = 0;
  filteredByMaxPrice: number = 0;
  filteredByBedroom: number = 0;
  filteredByBath: number = 0;

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

  constructor(private atvRoute: ActivatedRoute, private roomService: RoomService, private router: Router, private googleMapService: GoogleMapService, private cookie: CookieService) {
    super()
  }

  ngOnInit(): void {

    this.searchInfo = this.cookie.check('search_info') ? JSON.parse(this.cookie.get('search_info')) : searchInfo;
    // console.log('this.searchInfo', this.searchInfo);

    this.atvRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.locationId = params['locId'];
    })

    this.roomService.layDanhSachPhongTheoViTri(this.locationId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log('danh sach phong theo vi tri', result);
        this.arrRoom = result;
        this.updatedArrRoom = [...this.arrRoom];

        if (this.arrRoom.length > 0) {
          console.log('location name', this.arrRoom[0].locationId.name)
          this.loadMap(this.arrRoom[0].locationId.name + ',' + this.arrRoom[0].locationId.province);
        }
      },
      error: err => {
        console.log({ err })
      }
    })
  }

  goRoomDetail(roomDetail: Room): void {
    this.router.navigate([`roomdetail/${roomDetail._id}`]);
  }

  loadMap(locationName: string): void {
    this.googleMapService.getGeoCode(locationName).then((res: any) => {
      console.log('getGeoCode', res);
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
  }

  removeRoomFilter(): void {
    this.filteredByBath = 0;
    this.filteredByBedroom = 0;
  }

  removePriceFilter(): void {
    this.filteredByMaxPrice = 0;
    this.filteredByMinPrice = 0;
  }

  clickFilterPrice(): void {
    if (this.filteredByMinPrice === 0 && this.filteredByMaxPrice === 0)
      this.updatedArrRoom = [...this.arrRoom];
    else
      this.updatedArrRoom = this.arrRoom.filter(room => room.price >= this.filteredByMinPrice && room.price <= this.filteredByMaxPrice);

  }

  clickFilterRoom(): void {
    if (this.filteredByBedroom == 0 && this.filteredByBath == 0)
      this.updatedArrRoom = [...this.arrRoom];
    else if (this.filteredByBedroom == 0)
      this.updatedArrRoom = this.arrRoom.filter(room => room.bath == this.filteredByBath);
    else if (this.filteredByBath == 0)
      this.updatedArrRoom = this.arrRoom.filter(room => room.bedRoom == this.filteredByBedroom);
    else
      this.updatedArrRoom = this.arrRoom.filter(room => room.bedRoom == this.filteredByBedroom && room.bath == this.filteredByBath);
  }
}
