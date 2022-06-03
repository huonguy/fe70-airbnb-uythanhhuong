import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subParam!: Subscription;
  subService!: Subscription;

  userId: string = '';
  userDetails!: User;

  files: FileList;
  fileToUpload: File | null = null;

  noAvatar: string = '../../../../assets/images/no-profile-picture.png';
  editUserForm: boolean = false;

  @ViewChild('editForm') editForm!: NgForm;

  constructor(private atvRoute: ActivatedRoute, private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId)
    })

    this.subService = this.userService.layThongtinNguoiDung(this.userId).subscribe({
      next: result => {
        // console.log('user detail', result);
        this.userDetails = result;
      },
      error: err => {
        console.log({ err });
      }
    })
  }

  updateAvatar(event: Event) {
    this.files = (event.target as HTMLInputElement).files;
    this.fileToUpload = this.files.item(0);

    this.userService.capNhatAnhNguoiDung(this.fileToUpload).subscribe({
      next: result => {
        this.userDetails = result;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật ảnh thành công!', life: 3000 })
      },
      error: err => {
        console.log({ err })
      }
    });
  }

  editUser(event: any): void {
    event.preventDefault();
    this.editUserForm = !this.editUserForm;
  }

  cancelEditForm(): void {
    this.editUserForm = !this.editUserForm;
  }

  clickEditUser() {
    // console.log('edit form', this.userDetails);
    this.userService.capNhatNguoiDung(this.userDetails._id, this.userDetails).subscribe({
      next: resutl => {
        // console.log('cap nhat nguoi dung', resutl);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa thành công!', life: 3000 })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subParam) {
      this.subParam.unsubscribe();
    }

    if (this.subService) {
      this.subService.unsubscribe();
    }
  }
}
