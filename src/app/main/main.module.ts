import { NgModule } from '@angular/core';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination'
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { MonthListComponent } from './month-list/month-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteListMonthComponent } from './note-list-month/note-list-month.component';

export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    NoteListComponent,
    SchoolListComponent,
    MonthListComponent,
    NoteDetailComponent,
    SchoolDetailComponent,
    NoteListMonthComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
      NoteListComponent,
      SchoolListComponent,
      MonthListComponent,
      NoteDetailComponent,
      SchoolDetailComponent
  ]
})
export class MainModule { }
