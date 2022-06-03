import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  dangNhap(user: User): void {
    console.log(user);
    this.userService.dangNhap(user).subscribe({
      next: result => {
        // console.log(result)
        this.router.navigate([`/user/profile/${result.user._id}`]);

        let usLogin = JSON.stringify(result.user);
        localStorage.setItem(ACCESS_TOKEN, result.token);
        localStorage.setItem(USER_LOGIN, usLogin);

        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng nhập thành công!', life: 3000 })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }
}
