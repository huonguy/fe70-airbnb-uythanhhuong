import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  requestURL: string | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.requestURL = this.router.url;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
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
