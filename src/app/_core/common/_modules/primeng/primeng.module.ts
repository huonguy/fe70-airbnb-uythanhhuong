import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from "primeng/password";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CalendarModule,
    InputNumberModule,
    AccordionModule,
    TabViewModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    RippleModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    VirtualScrollerModule,
    TooltipModule,
    RadioButtonModule,
    PasswordModule,
    BreadcrumbModule
  ],
  exports: [
    CalendarModule,
    InputNumberModule,
    AccordionModule,
    TabViewModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    RippleModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    VirtualScrollerModule,
    TooltipModule,
    RadioButtonModule,
    PasswordModule,
    BreadcrumbModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimengModule { }
