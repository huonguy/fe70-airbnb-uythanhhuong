import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  dangKy(registerForm: NgForm): void {
    this.userService.dangKy(registerForm.value).subscribe({
      next: result => {
        // console.log(result);
        registerForm.reset();
        this.router.navigate(['/user/login']);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng ký thành công!', life: 3000 })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 })
      }
    })
  }
}
