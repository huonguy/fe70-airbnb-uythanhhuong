import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy, DoCheck, AfterViewInit {
  subParam!: Subscription;
  userId: string = '';
  userDetails!: User;

  files: FileList;
  fileToUpload: File | null = null;

  noAvatar: string = '../../../../assets/images/no-profile-picture.png';
  isUpdatedUser: boolean = false;

  @ViewChild('editForm') editForm!: NgForm;

  constructor(private atvRoute: ActivatedRoute, private userService: UserService) { }
  ngAfterViewInit(): void {


  }

  ngDoCheck(): void {

  }

  ngOnInit(): void {

    this.subParam = this.atvRoute.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId)
    })

    this.userService.layThongtinNguoiDung(this.userId).subscribe({
      next: result => {
        console.log('user detail', result);
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
      },
      error: err => {
        console.log({ err })
      }
    });
  }

  showEditUserForm(event: any): void {
    event.preventDefault();
    this.isUpdatedUser = !this.isUpdatedUser;
  }

  cancelEditForm(): void {
    this.isUpdatedUser = !this.isUpdatedUser;
  }

  editUserDetails() {
    console.log('edit form', this.userDetails);

    // this.userService.capNhatNguoiDung(this.userDetails._id, this.userDetails).subscribe({
    //   next: resutl => {
    //     console.log(resutl);
    //   },
    //   error: err => {
    //     console.log({ err });
    //   }
    // }
  }

  ngOnDestroy(): void {
    if (this.subParam) {
      this.subParam.unsubscribe();
    }
  }


}
