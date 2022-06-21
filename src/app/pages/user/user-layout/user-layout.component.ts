import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent extends Destroyable implements OnInit {
  @ViewChild('container') container!: ElementRef;

  requestURL: string | undefined;

  constructor(private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.requestURL = this.router.url;

    this.router.events.pipe(takeUntil(this.destroy$), filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      this.requestURL = val['url'];
    })
  }

  signUp(): void {
    this.router.navigate(['/user/register']);
  }

  signIn(): void {
    this.router.navigate(['/user/login']);
  }
}
