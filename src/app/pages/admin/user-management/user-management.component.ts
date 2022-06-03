import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  imageDefault: string = "../../../../assets/images/no-image-ico.jpg"
  headerDialog!: string;
  actionBtnDialog!: string;

  arrUser!: User[];
  user!: User;

  userDialog!: boolean;
  submitted!: boolean;
  viewDetailDialog!: boolean;

  roleList: any[];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private userService: UserService) { }

  ngOnInit() {
    this.userService.layDanhSachNguoiDungPhanTrang().subscribe({
      next: result => {
        console.log('danh sach nguoi dung', result);
        this.arrUser = result;
      },
      error: err => {
        console.log({ err });
      }
    });

    this.roleList = [
      { label: 'KHÁCH HÀNG', value: 'CLIENT' },
      { label: 'QUẢN TRỊ VIÊN', value: 'ADMIN' },
    ];
  }

  addNewUser() {
    this.headerDialog = "Thêm người dùng";
    this.actionBtnDialog = "Thêm";

    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  viewDetailUser(userId: string) {
    this.viewDetailDialog = true;

    this.userService.layThongtinNguoiDung(userId).subscribe({
      next: result => {
        console.log('thong tin nguoi dung', result);
        this.user = result;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })
  }

  editUser(user: User) {
    this.headerDialog = "Chỉnh sửa người dùng";
    this.actionBtnDialog = "Cập nhật";

    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa ' + user.name + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        this.userService.xoaNguoiDung(user._id).subscribe({
          next: result => {
            console.log('xoa nguoi dung', result);
            this.arrUser = this.arrUser.filter(val => val._id !== user._id);
            this.user = {};
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công!', life: 3000 });
          },
          error: err => {
            console.log({ err });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
          }
        })
      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.viewDetailDialog = false;
    this.submitted = false;
  }

  clickUserAction() {
    this.submitted = true;

    if (this.user._id) {
      let userIndex = this.arrUser.findIndex(u => u._id === this.user._id);
      if (userIndex !== -1) {
        this.userService.capNhatNguoiDung(this.user._id, this.user).subscribe({
          next: result => {
            console.log('cap nhat nguoi dung', result);
            this.arrUser[userIndex] = result;
            this.arrUser = [...this.arrUser];

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa thành công.', life: 3000 });
          },
          error: err => {
            console.log({ err });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
          }
        });
      }
    }
    else {
      this.userService.taoNguoiDung(this.user).subscribe({
        next: result => {
          console.log('tạo người dùng', result);
          this.arrUser.push(result);
          this.arrUser = [...this.arrUser];

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo thành công.', life: 3000 });
        },
        error: err => {
          console.log({ err });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
        }
      })
    }

    this.userDialog = false;
    this.user = {};
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
