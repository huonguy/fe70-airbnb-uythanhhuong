import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs';
import { Destroyable } from 'src/app/pages/_directives/Destroyable.directive';
import { User } from 'src/app/_core/models/user';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Destroyable implements OnInit, OnChanges {
  @Input() userInput: User;
  noAvatar: string = '../../../../../assets/images/no-profile-picture.png';
  isLogged: boolean = false;
  isOpenedProfile: boolean = false;
  requestUrl: string | undefined;
  user: User;

  logoColor: string;
  languageColor: string;

  constructor(private router: Router, private confirmationService: ConfirmationService) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userInput) {
      this.user = this.userInput;
      localStorage.setItem(USER_LOGIN, JSON.stringify(this.user));
    }
  }

  ngOnInit(): void {
    this.requestUrl = this.router.url.substring(1);

    this.router.events.pipe(takeUntil(this.destroy$), filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      this.requestUrl = val['url'];
    })

    if (localStorage.getItem(USER_LOGIN)) {
      this.isLogged = true;
      this.user = JSON.parse(localStorage.getItem(USER_LOGIN));
    }
    else {
      this.isLogged = false;
    }
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
