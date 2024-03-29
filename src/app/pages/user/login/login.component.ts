import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';
import { Destroyable } from '../../_directives/Destroyable.directive';
import jwt_decode, { JwtDecodeOptions, JwtPayload } from "jwt-decode";
import { data } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class LoginComponent extends Destroyable implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService, private router: Router, private location: Location) {
    super()
  }

  ngOnInit(): void {
  }

  dangNhap(user: User): void {
    this.userService.dangNhap(user).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        const token = result.token;
        const decoded = jwt_decode(token);
        const user = decoded["data"];

        this.router.navigate([`/user/profile/${user._id}`]);

        let usLogin = JSON.stringify(user);
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(USER_LOGIN, usLogin);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng nhập thành công!', life: 3000 })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }
}
