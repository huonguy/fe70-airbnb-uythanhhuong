import { AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/_core/models/user';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() userInput: User;
  noAvatar: string = '../../../../../assets/images/no-profile-picture.png';
  isLogged: boolean = false;
  isOpenedProfile: boolean = false;
  requestUrl: string | undefined;
  user: User;

  logoColor: string = '#FF385C';
  languageColor: string = '#000000;'

  constructor(private router: Router, private confirmationService: ConfirmationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.userInput) {
      this.user = this.userInput;
      localStorage.setItem(USER_LOGIN, JSON.stringify(this.user));
    }
  }

  ngOnInit(): void {
    this.requestUrl = this.router.url.substring(1);
    if (this.requestUrl === 'home' || this.requestUrl === '') {
      this.logoColor = this.languageColor = '#fff';
    }

    if (localStorage.getItem(USER_LOGIN)) {
      this.isLogged = true;
      this.user = JSON.parse(localStorage.getItem(USER_LOGIN));
    }
    else {
      this.isLogged = false;
    }
  }

  ngAfterViewInit(): void {

  }

  toggleProfile(): void {
    this.isOpenedProfile = !this.isOpenedProfile;
    console.log('isOpenedProfile', this.isOpenedProfile)
  }

  logOut() {
    this.confirmationService.confirm({
      message: 'Bạn muốn đăng xuất tài khoản này?',
      header: 'Đăng xuất',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        //Actual logic to perform a confirmation
        console.log('ok');
        if (localStorage.getItem(USER_LOGIN)) {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(ACCESS_TOKEN);
        }
        this.router.navigate(['/user/login']);
      }
    });
  }
}
