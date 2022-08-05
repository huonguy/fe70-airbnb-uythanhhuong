import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { DOMAIN } from '../util/config';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  dangNhap(user: User): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/auth/login`, user);
    return ob;
  }

  dangKy(user: User): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/auth/register`, user)
    return ob;
  }

  layThongtinNguoiDung(userId: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/users/${userId}`);
    return ob;
  }

  capNhatAnhNguoiDung(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('avatar', fileToUpload, fileToUpload.name);

    let ob = this.httpClient.post(`${DOMAIN}/api/users/upload-avatar`, formData);
    return ob;
  }

  layDanhSachNguoiDung(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/users`);
    return ob;
  }

  taoNguoiDung(user: User): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/users`, user);
    return ob;
  }

  capNhatNguoiDung(userId: string, user: User): Observable<any> {
    let ob = this.httpClient.put(`${DOMAIN}/api/users/${userId}`, user);
    return ob;
  }

  xoaNguoiDung(userId: string): Observable<any> {
    let ob = this.httpClient.delete(`${DOMAIN}/api/users/${userId}`);
    return ob;
  }
}
