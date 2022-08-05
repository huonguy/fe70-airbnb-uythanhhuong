import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs';
import { Country } from 'src/app/_core/models/country';
import { Location } from 'src/app/_core/models/location';
import { Province } from 'src/app/_core/models/province';
import { CountryService } from 'src/app/_core/services/country.service';
import { LocationService } from 'src/app/_core/services/location.service';
import { ProvinceService } from 'src/app/_core/services/province.service';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.scss']
})
export class LocationManagementComponent extends Destroyable implements OnInit {
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"
  actionBtnDialog!: string;
  headerDialog!: string;
  locationDialog!: boolean;
  submitted!: boolean;
  viewDetailDialog!: boolean;

  files: FileList;
  fileToUpload: File | null = null;

  arrLocation!: Location[];
  location!: Location;

  countries: any[];
  provinces: any[];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private locationService: LocationService,
    private countryService: CountryService, private provinceService: ProvinceService) {
    super()
  }

  ngOnInit(): void {
    this.locationService.layDanhSachViTri().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log('danh sach vi tri', result);
        this.arrLocation = result;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })

    this.countryService.layDanhSachQuocGia().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.countries = result.map((r) => { return { "label": r.name, "value": r._id } });
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });

      }
    })

    this.provinceService.layDanhSachTinh().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.provinces = result.map((r) => { return { "label": r.name, "value": r._id } });
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
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

  viewDetailLocation(locationId: string): void {
    this.viewDetailDialog = true;

    this.locationService.layThongTinChiTietViTri(locationId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.location = result;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })
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
        this.locationService.xoaViTri(location._id).pipe(takeUntil(this.destroy$)).subscribe({
          next: result => {
            this.arrLocation = this.arrLocation.filter(val => val._id !== location._id);
            this.location = {};
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
          },
          error: err => {
            console.log({ err });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
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
        this.locationService.capNhatThongTinViTri(this.location._id, this.location).pipe(takeUntil(this.destroy$)).subscribe({
          next: result => {
            this.arrLocation[locationIndex] = result.location;
            this.arrLocation = [...this.arrLocation];

            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
          },
          error: err => {
            console.log({ err });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
          }
        })
      }
    }
    else {
      this.locationService.taoViTri(this.location).pipe(takeUntil(this.destroy$)).subscribe({
        next: result => {
          this.arrLocation.push(result.location);
          this.arrLocation = [...this.arrLocation];

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
        },
        error: err => {
          console.log({ err });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      })
    }

    this.locationDialog = false;
    this.location = {};
  }

  hideDialog(): void {
    this.locationDialog = false;
    this.viewDetailDialog = false;
    this.submitted = false;
  }

  updateImage(event: Event, locId: string) {
    this.files = (event.target as HTMLInputElement).files;
    this.fileToUpload = this.files.item(0);

    let locationIndex = this.arrLocation.findIndex(loc => loc._id === locId);
    if (locationIndex !== -1) {
      this.locationService.capNhatAnhViTri(this.fileToUpload, locId).pipe(takeUntil(this.destroy$)).subscribe({
        next: result => {
          this.arrLocation[locationIndex] = result.location;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
        },
        error: err => {
          console.log({ err });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      })
    }
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
