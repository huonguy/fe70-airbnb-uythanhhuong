import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, DoCheck {
  messageContent: Message[];
  @ViewChild('container') container!: ElementRef;

  requestURL: string | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.requestURL = this.router.url.replace('/user/', '');

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      this.requestURL = val['url'].replace('/user/', '');
    })
  }

  ngDoCheck(): void {
    this.checkRequestUrl();
  }

  checkRequestUrl(): void {
    if (this.container) {
      this.requestURL === 'login' ?
        this.container.nativeElement.classList.remove("right-panel-active") : '';

      this.requestURL === 'register' ?
        this.container.nativeElement.classList.add("right-panel-active") : '';
    }
  }

  signUp(): void {
    this.router.navigate(['/user/register']);
  }

  signIn(): void {
    this.router.navigate(['/user/login']);
  }

  returnMessage($event: any) {
    this.messageContent = [
      { severity: $event.status, summary: $event.status, detail: $event.message, life: 3000 },
    ];
  }
}
