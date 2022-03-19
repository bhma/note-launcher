import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { INote } from '../model/note.model';
// import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getNotes(){
        return this.http.get<INote[]>(`${this.API}/notes`)
        .pipe(take(1));
    }

    getNoteByID(noteId: string){
        return this.http.get<INote>(`${this.API}/note/${noteId}`)
        .pipe(take(1));
    }

    getNoteByMonth(month: string){
        return this.http.get<any>(`${this.API}/notes/${month}`)
        .pipe(take(1));
    }

    createNote(note: INote){
        return this.http.post<INote>(`${this.API}/createNote`, note)
        .pipe(take(1));
    }

    createManyNotes(notes: INote[]){
        return this.http.post<INote>(`${this.API}/createManyNotes`, notes)
        .pipe(take(1));
    }

    updateNote(note: INote){
        return this.http.put<INote>(`${this.API}/updateNote`, note)
        .pipe(take(1));
    }

    // exportNotesToExcel(notes: INote[]){
    //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(notes);
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     XLSX.writeFile(wb, 'Notas.xlsx');
    // }
}
