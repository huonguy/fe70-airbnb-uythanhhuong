import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs';
import { Location } from 'src/app/_core/models/location';
import { Room } from 'src/app/_core/models/room';
import { LocationService } from 'src/app/_core/services/location.service';
import { RoomService } from 'src/app/_core/services/room.service';
import { Destroyable } from '../../_directives/Destroyable.directive';
import { amenities } from 'src/app/_core/constants/amenities';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent extends Destroyable implements OnInit {
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"
  actionBtnDialog!: string;
  headerDialog!: string;
  roomDialog!: boolean;
  submitted!: boolean;
  viewDetailDialog!: boolean;

  files: FileList;
  fileToUpload: File | null = null;

  arrRoom!: Room[];
  room!: Room;
  arrLocation!: Location[];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private roomService: RoomService, private locationService: LocationService) {
    super()
  }

  ngOnInit(): void {
    this.roomService.layDanhSachPhong().pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        result = result.map(res => {
          return {
            ...res,
            elevator: (res.elevator == 1) ? true : false,
            hotTub: (res.hotTub == 1) ? true : false,
            pool: (res.pool == 1) ? true : false,
            indoorFireplace: (res.indoorFireplace == 1) ? true : false,
            dryer: (res.dryer == 1) ? true : false,
            gym: (res.gym == 1) ? true : false,
            kitchen: (res.kitchen == 1) ? true : false,
            wifi: (res.wifi == 1) ? true : false,
            heating: (res.heating == 1) ? true : false,
            cableTV: (res.cableTV == 1) ? true : false,
          }
        })

        this.arrRoom = result;
        console.log(this.arrRoom);

      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })

    this.locationService.layDanhSachViTri().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.arrLocation = result.map((r) => { return { "label": r.name, "value": r._id } });;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })
  }

  addNewRoom(): void {
    this.headerDialog = "Thêm phòng";
    this.actionBtnDialog = "Thêm";

    this.room = {};
    this.submitted = false;
    this.roomDialog = true;
  }

  viewDetailRoom(roomId: string): void {
    this.viewDetailDialog = true;

    this.roomService.layThongTinChiTietPhong(roomId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.room = result;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })
  }

  editRoom(room: Room): void {
    this.headerDialog = "Chỉnh sửa phòng";
    this.actionBtnDialog = 'Cập nhật';


    this.room = { ...room };
    console.log(this.room)
    this.roomDialog = true;
  }

  deleteRoom(room: Room): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa ' + room.name + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        this.roomService.xoaPhong(room._id).pipe(takeUntil(this.destroy$)).subscribe({
          next: result => {
            this.arrRoom = this.arrRoom.filter(val => val._id !== room._id);
            this.room = {};
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

  clickRoomAction(): void {
    this.submitted = true;

    if (this.room._id) {
      let roomIndex = this.arrRoom.findIndex(r => r._id === this.room._id);
      if (roomIndex !== -1) {
        this.roomService.capNhatThongTinPhong(this.room._id, this.room).pipe(takeUntil(this.destroy$)).subscribe({
          next: result => {
            this.arrRoom[roomIndex] = result.room;
            this.arrRoom = [...this.arrRoom];

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
      console.log(this.room)
      this.roomService.taoPhong(this.room).pipe(takeUntil(this.destroy$)).subscribe({
        next: result => {
          this.arrRoom.push(result.room);
          this.arrRoom = [...this.arrRoom];

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
        },
        error: err => {
          console.log({ err });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      })
    }

    this.roomDialog = false;
    this.room = {};
  }

  hideDialog(): void {
    this.roomDialog = false;
    this.viewDetailDialog = false;
    this.submitted = false;
  }

  updateImage(event: Event, roId: string) {
    this.files = (event.target as HTMLInputElement).files;
    this.fileToUpload = this.files.item(0);

    let roomIndex = this.arrRoom.findIndex(ro => ro._id === roId);
    if (roomIndex !== -1) {
      this.roomService.capNhatAnhPhong(this.fileToUpload, roId).pipe(takeUntil(this.destroy$)).subscribe({
        next: result => {
          this.arrRoom[roomIndex] = result.room;

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
