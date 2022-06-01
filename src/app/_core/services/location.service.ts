import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';
import { Location } from '../models/location';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachViTri(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/locations`);
    return ob;
  }

  taoViTri(location: Location): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/locations`, location);
    return ob;
  }

  capNhatThongTinViTri(id: string, location: Location) {
    let ob = this.httpClient.put(`${DOMAIN}/api/locations/${id}`, location);
    return ob;
  }

  capNhatAnhViTri(fileToUpload: File, locationId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('location', fileToUpload, fileToUpload.name);

    let ob = this.httpClient.post(`${DOMAIN}/api/locations/upload-images/${locationId}`, formData);
    return ob;
  }

  xoaViTri(id: string): Observable<any> {
    let ob = this.httpClient.delete(`${DOMAIN}/api/locations/${id}`);
    return ob;
  }
}
