import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()

export abstract class Destroyable implements OnDestroy {
  destroy$ = new Subject();
  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
}
