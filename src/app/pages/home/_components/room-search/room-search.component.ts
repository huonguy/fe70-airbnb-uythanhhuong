import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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

  checkinDate: Date = new Date();
  checkoutDate: Date = new Date();

  adultsNum: number = 0;
  childrenNum: number = 0;
  infantsNum: number = 0;
  petsNum: number = 0;

  arrLocation: Location[];
  selectedLocation: Location;

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.locationService.layDanhSachViTri().subscribe({
      next: result => {
        console.log('danh sach vi tri', result)
        this.arrLocation = result;
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
  }

  chooseLocation(value: Location): void {
    this.selectedLocation = value;
  }

  searchRoom(): void {
    this.router.navigate([`roomlist/${this.selectedLocation._id}`]);
  }

  ngOnDestroy(): void {
  }
}
