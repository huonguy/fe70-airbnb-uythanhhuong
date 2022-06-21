import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransformDataService {
  private data = new BehaviorSubject(null);
  public asData = this.data.asObservable();

  constructor() { }

  public transformData(value: any) {
    this.data.next(value);
  }
}
