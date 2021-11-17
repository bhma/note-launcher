import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthListComponent } from './main/month-list/month-list.component';
import { NoteDetailComponent } from './main/note-detail/note-detail.component';
import { NoteListComponent } from './main/note-list/note-list.component';
import { SchoolDetailComponent } from './main/school-detail/school-detail.component';
import { SchoolListComponent } from './main/school-list/school-list.component';

const routes: Routes = [
    { path: 'home', component: NoteListComponent },
    { path: 'noteListMonth', component: NoteListComponent },
    { path: 'months', component: MonthListComponent },
    { path: 'schools', component: SchoolListComponent },
    { path: 'noteDetail/:id', component: NoteDetailComponent },
    { path: 'schoolDetail/:id', component: SchoolDetailComponent },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '*', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
