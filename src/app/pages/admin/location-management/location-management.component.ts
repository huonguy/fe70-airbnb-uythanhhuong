import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Location } from 'src/app/_core/models/location';
import { LocationService } from 'src/app/_core/services/location.service';

@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.scss']
})
export class LocationManagementComponent implements OnInit {
  actionBtnDialog!: string;
  headerDialog!: string;
  locationDialog!: boolean;
  submitted!: boolean;

  arrLocation!: Location[];
  location!: Location;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.layDanhSachViTri().subscribe({
      next: result => {
        console.log('danh sach vi tri', result);
        this.arrLocation = result;
      },
      error: err => {
        console.log({ err });
      }
    })
  }

  addNewLocation(): void {
    this.headerDialog = "Thêm địa điểm";
    this.actionBtnDialog = "Thêm";

    this.location = {};
    this.submitted = false;
    this.locationDialog = true;
  }

  editLocation(location: Location): void {
    this.headerDialog = 'Chỉnh sửa địa điểm';
    this.actionBtnDialog = 'Cập nhật';

    this.location = { ...location };
    this.locationDialog = true;
  }

  deleteLocation(location: Location): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa ' + location.name + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        this.locationService.xoaViTri(location._id).subscribe({
          next: result => {
            console.log('xoa vi tri', result);
            this.arrLocation = this.arrLocation.filter(val => val._id !== location._id);
            this.location = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công', life: 3000 });
          },
          error: err => {
            console.log({ err });
          }
        })
      }
    })
  }

  clickLocationAction(): void {
    this.submitted = true;

    if (this.location._id) {
      let locationIndex = this.arrLocation.findIndex(loc => loc._id === this.location._id);
      if (locationIndex !== -1) {
        this.locationService.capNhatThongTinViTri(this.location._id, this.location).subscribe({
          next: result => {
            console.log('cap nhat vi tri', result);
            this.arrLocation[locationIndex] = result;
            this.arrLocation = [...this.arrLocation];

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sửa thành công.', life: 3000 });
          },
          error: err => {
            console.log({ err });
          }
        })
      }
    }
    else {
      this.locationService.taoViTri(this.location).subscribe({
        next: result => {
          console.log('tao vi tri', result);
          this.arrLocation.push(result);
          this.arrLocation = [...this.arrLocation];

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo thành công.', life: 3000 });
        }
      })
    }

    this.locationDialog = false;
    this.location = {};
  }

  hideDialog(): void {
    this.locationDialog = false;
    this.submitted = false;
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
