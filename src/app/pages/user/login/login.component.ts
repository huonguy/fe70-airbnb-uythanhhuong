import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() eventMessage = new EventEmitter();

  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  dangNhap(user: User): void {
    console.log(user);
    this.userService.dangNhap(user).subscribe({
      next: result => {
        console.log(result)
        this.eventMessage.emit({ status: 'success', message: 'Đăng nhập thành công!' });

        // this.router.navigate([`/user/profile/${result.user._id}`]);
        this.location.back();

        let usLogin = JSON.stringify(result.user);
        localStorage.setItem(ACCESS_TOKEN, result.token);
        localStorage.setItem(USER_LOGIN, usLogin);
      },
      error: err => {
        console.log({ err });

        this.eventMessage.emit({ status: 'error', message: 'Tài khoản mật khẩu không đúng!' });
      }
    });
  }
}
