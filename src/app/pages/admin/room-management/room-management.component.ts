import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Location } from 'src/app/_core/models/location';
import { Room } from 'src/app/_core/models/room';
import { LocationService } from 'src/app/_core/services/location.service';
import { RoomService } from 'src/app/_core/services/room.service';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit {
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

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private roomService: RoomService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.roomService.layDanhSachPhong().subscribe({
      next: result => {
        console.log('danh sach phong', result);
        this.arrRoom = result;
      },
      error: err => {
        console.log({ err });
      }
    })

    this.locationService.layDanhSachViTri().subscribe({
      next: result => {
        this.arrLocation = result;
      },
      error: err => {
        console.log({ err });
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

    this.roomService.layThongTinChiTietPhong(roomId).subscribe({
      next: result => {
        console.log('thong tin chi tiet phong', result);
        this.room = result;
      },
      error: err => {
        console.log({ err });
      }
    })
  }

  editRoom(room: Room): void {
    this.headerDialog = "Chỉnh sửa phòng";
    this.actionBtnDialog = 'Cập nhật';

    this.room = { ...room };
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
        this.roomService.xoaPhong(room._id).subscribe({
          next: result => {
            console.log('xoa phong', result);
            this.arrRoom = this.arrRoom.filter(val => val._id !== room._id);
            this.room = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công', life: 3000 });
          },
          error: err => {
            console.log({ err })
          }
        })
      }
    })
  }

  clickRoomAction(): void {
    this.submitted = true;

    if (this.room._id) {
      console.log('thong tin thay doi', this.room);
      let roomIndex = this.arrRoom.findIndex(r => r._id === this.room._id);
      if (roomIndex !== -1) {
        this.roomService.capNhatThongTinPhong(this.room._id, this.room).subscribe({
          next: result => {
            console.log('cap nhat phong', result);

            result.locationId = this.arrLocation.find(loc => loc._id === result.locationId);
            this.arrRoom[roomIndex] = result;
            this.arrRoom = [...this.arrRoom];

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sửa thành công.', life: 3000 });
          },
          error: err => {
            console.log({ err });
          }
        })
      }
    }
    else {
      this.roomService.taoPhong(this.room).subscribe({
        next: result => {
          console.log('tạo phòng', result);

          result.locationId = this.arrLocation.find(loc => loc._id === result.locationId);
          this.arrRoom.push(result);
          this.arrRoom = [...this.arrRoom];

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo thành công.', life: 3000 });
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
      this.roomService.capNhatAnhPhong(this.fileToUpload, roId).subscribe({
        next: result => {
          console.log('cap nhat anh phong', result);

          result.locationId = this.arrLocation.find(loc => loc._id === result.locationId);
          this.arrRoom[roomIndex] = result;
          this.arrRoom = [...this.arrRoom];

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cập nhật ảnh thành công.', life: 3000 });

        },
        error: err => {
          console.log({ err });
        }
      })
    }
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
