import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() eventMessage = new EventEmitter();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  dangKy(values: User): void {
    console.log(values);
    this.userService.dangKy(values).subscribe({
      next: result => {
        console.log(result)
        this.eventMessage.emit({ status: 'success', message: 'Đăng ký thành công!' });

        this.router.navigate(['/user/login']);
      },
      error: err => {
        this.eventMessage.emit({ status: 'error', message: 'Đăng ký không thành công!' });
        console.log({ err });
      }
    })
  }
}
