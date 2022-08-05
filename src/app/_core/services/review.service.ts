import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachDanhGiaTheoPhong(roomId: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/reviews/by-room?roomId=${roomId}`);
    return ob;
  }

  taoMoiDanhGia(roomId: string, content: string): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/reviews?roomId=${roomId}`, { content });
    return ob;
  }

  xoaDanhGia(reviewId: string): Observable<any> {
    let ob = this.httpClient.delete(`${DOMAIN}/api/reviews/${reviewId}`);
    return ob;
  }

  capNhatDanhGia(reviewId: string, content: string): Observable<any> {
    let ob = this.httpClient.put(`${DOMAIN}/api/reviews/${reviewId}`, { content });
    return ob;
  }
}
