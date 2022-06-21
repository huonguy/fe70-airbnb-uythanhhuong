import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs';
import { User } from 'src/app/_core/models/user';
import { ACCESS_TOKEN, USER_LOGIN } from 'src/app/_core/util/config';
import { Destroyable } from '../../_directives/Destroyable.directive';

declare var $: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent extends Destroyable implements OnInit, AfterViewInit {
  constructor(private router: Router, private confirmationService: ConfirmationService) {
    super()
  }
  user!: User;
  noAvatar: string = '../../../../assets/images/no-profile-picture.png';
  scrollTopSection!: string;

  ngOnInit(): void {
    if (localStorage.getItem(USER_LOGIN)) {
      this.user = JSON.parse(localStorage.getItem(USER_LOGIN));
    }

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(takeUntil(this.destroy$)).subscribe((pageSection) => {
      this.scrollTopSection = pageSection['url'].split('#')[0];
    })

    this.router.navigate(['/admin/manageuser']);
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $(".sidebar .collapse").collapse("hide");
        }
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function () {
        if ($(window).width() < 768) {
          $(".sidebar .collapse").collapse("hide");
        }

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          $(".sidebar .collapse").collapse("hide");
        }
      });

      // Scroll to top button appear
      $(document).on("scroll", function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $(".scroll-to-top").fadeIn();
        } else {
          $(".scroll-to-top").fadeOut();
        }
      })
    })
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
