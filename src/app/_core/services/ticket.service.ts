import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../util/config';
import { Ticket } from '../models/ticket';

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private httpClient: HttpClient) { }

  layDanhSachVe(): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/tickets`);
    return ob;
  }

  layThongTinChiTietVe(id: string): Observable<any> {
    let ob = this.httpClient.get(`${DOMAIN}/api/tickets/${id}`);
    return ob;
  }

  taoVe(ticket: Ticket): Observable<any> {
    let ob = this.httpClient.post(`${DOMAIN}/api/tickets`, ticket);
    return ob;
  }

  xoaVe(id: string): Observable<any> {
    let ob = this.httpClient.delete(`${DOMAIN}/api/tickets/${id}`);
    return ob;
  }

  capNhatVe(id: string, ticket: Ticket): Observable<any> {
    let ob = this.httpClient.put(`${DOMAIN}/api/tickets/${id}`, ticket)
    return ob;
  }
}
