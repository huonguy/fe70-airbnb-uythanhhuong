import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';
import { Room } from '../models/room';

@Injectable({ providedIn: 'root' })
export class RoomService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachPhong(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/rooms`);
    return ob;
  }

  layDanhSachPhongTheoViTri(locationId: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/rooms?locationId=${locationId}`);
    return ob;
  }

  layThongTinChiTietPhong(id: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/rooms/${id}`);
    return ob;
  }

  taoPhong(room: Room): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/rooms`, room);
    return ob;
  }

  capNhatThongTinPhong(id: string, room: Room): Observable<any> {
    let ob = this.httpClient.put(`${DOMAIN}/api/rooms/${id}`, room);
    return ob;
  }

  capNhatAnhPhong(fileToUpload: File, roomId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('room', fileToUpload, fileToUpload.name);

    let ob = this.httpClient.post(`${DOMAIN}/api/rooms/upload-image/${roomId}`, formData);
    return ob;
  }

  xoaPhong(id: string): Observable<any> {
    let ob = this.httpClient.delete(`${DOMAIN}/api/rooms/${id}`);
    return ob;
  }
}
