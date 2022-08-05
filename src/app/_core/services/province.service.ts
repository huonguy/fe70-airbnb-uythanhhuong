import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';

@Injectable({ providedIn: 'root' })
export class ProvinceService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachTinh(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/provinces`);
    return ob;
  }

}
