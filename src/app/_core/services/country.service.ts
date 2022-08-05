import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachQuocGia(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/countries`);
    return ob;
  }
}
