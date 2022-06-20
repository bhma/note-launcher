import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BalanceListComponent } from './main/balance-list/balance-list.component';
import { MonthListComponent } from './main/month-list/month-list.component';
import { NoteDetailComponent } from './main/note-detail/note-detail.component';
import { NoteListMonthComponent } from './main/note-list-month/note-list-month.component';
import { NoteListComponent } from './main/note-list/note-list.component';
import { SchoolDetailComponent } from './main/school-detail/school-detail.component';
import { SchoolListComponent } from './main/school-list/school-list.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: NoteListComponent, canActivate: [AuthGuard] },
    { path: 'noteListMonth', component: NoteListMonthComponent, canActivate: [AuthGuard] },
    { path: 'months', component: MonthListComponent, canActivate: [AuthGuard] },
    { path: 'schools', component: SchoolListComponent, canActivate: [AuthGuard] },
    { path: 'balance', component: BalanceListComponent, canActivate: [AuthGuard] },
    { path: 'noteDetail/:id', component: NoteDetailComponent, canActivate: [AuthGuard] },
    { path: 'schoolDetail/:id', component: SchoolDetailComponent, canActivate: [AuthGuard] },

    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '*', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
