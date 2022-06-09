import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from 'src/app/_core/models/location';
import { LocationService } from 'src/app/_core/services/location.service';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})
export class RoomSearchComponent implements OnInit, OnDestroy {
  getScreenWidth: any;
  getScreenHeight: any;

  checkIn: Date = new Date();
  checkOut: Date = new Date();
  adultsNum: number = 0;
  childrenNum: number = 0;
  infantsNum: number = 0;
  petsNum: number = 0;

  arrLocation: Location[];
  selectedLocation: Location;

  arrLocationFilter: Location[];
  locationName!: string;

  constructor(private locationService: LocationService, private router: Router, private messageService: MessageService) {
    this.checkOut.setDate(this.checkIn.getDate() + 1)
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.locationService.layDanhSachViTri().subscribe({
      next: result => {
        console.log('danh sach vi tri', result)
        this.arrLocationFilter = this.arrLocation = result;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.closeActivedTab();
  }

  closeActivedTab(): void {
    let tabs = document.querySelectorAll('.tab-content > div');
    tabs.forEach(function (tab, i) {
      if (tab.classList.contains('show')) {
        tab.classList.remove('show');
        return;
      }
    })
  }

  chooseLocation(value: Location): void {
    this.selectedLocation = value;
    this.locationName = this.selectedLocation.name;
  }

  searchRoom(): void {
    if (this.calculateDiff(this.checkIn, this.checkOut) <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ngày nhận phòng và trả phòng không hợp lệ.', life: 3000 })
      return;
    }

    let searchParam = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      adultsNum: this.adultsNum,
      childrenNum: this.childrenNum,
      infantsNum: this.infantsNum,
      petsNum: this.petsNum
    };

    if (this.selectedLocation) {
      this.router.navigate([`roomlist/${this.selectedLocation._id}`], {
        queryParams: searchParam, queryParamsHandling: 'merge'
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bạn chưa chọn địa điểm đi.', life: 3000 });
    }
  }

  searchRoomWithSmallScreen(value: Location): void {
    this.router.navigate([`roomlist/${value._id}`]);
  }

  calculateDiff(cInDate: Date, cOutDate: Date) {
    var date1 = new Date(cInDate);
    let date2 = new Date(cOutDate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days.toString());
  }

  applyFilter(value: string): void {
    if (value === '') {
      this.arrLocationFilter = [...this.arrLocation];
    }
    else {
      this.arrLocationFilter = this.arrLocation.filter(loc => loc.name?.toLowerCase().includes(value.toLowerCase()));
    }
  }

  ngOnDestroy(): void {
  }
}
