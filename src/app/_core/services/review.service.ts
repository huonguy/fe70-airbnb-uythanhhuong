import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachDanhGiaTheoPhong(roomId: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/reviews/byRoom?roomId=${roomId}`);
    return ob;
  }
}
