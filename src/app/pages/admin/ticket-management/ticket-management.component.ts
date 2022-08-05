import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs';
import { Ticket } from 'src/app/_core/models/ticket';
import { TicketService } from 'src/app/_core/services/ticket.service';
import { Destroyable } from '../../_directives/Destroyable.directive';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent extends Destroyable implements OnInit {

  arrTicket: Ticket[];
  ticket!: Ticket;

  viewDetailDialog!: boolean;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private ticketService: TicketService) {
    super()
  }

  ngOnInit(): void {
    this.ticketService.layDanhSachVe().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log(result);
        this.arrTicket = result;
      },
      error: err => {
        console.log({ err })
      }
    })
  }

  deleteTicket(ticket: Ticket): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa mã đặt phòng' + ticket._id + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        this.ticketService.xoaVe(ticket._id).pipe(takeUntil(this.destroy$)).subscribe({
          next: result => {
            this.arrTicket = this.arrTicket.filter(val => val._id !== ticket._id);
            this.ticket = null;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
          },
          error: err => {
            console.log({ err });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
          }
        })
      }
    });
  }

  viewDetailTicket(ticketId: string): void {
    this.viewDetailDialog = true;

    this.ticketService.layThongTinChiTietVe(ticketId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.ticket = result;
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    })
  }

  hideDialog() {
    this.viewDetailDialog = false;
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
