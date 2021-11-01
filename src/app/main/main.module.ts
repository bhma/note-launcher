import { NgModule } from '@angular/core';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { MonthListComponent } from './month-list/month-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { AppRoutingModule } from '../app-routing.module';

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
    SchoolDetailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    PaginationModule.forRoot()
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
