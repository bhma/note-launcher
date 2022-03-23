import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { INote } from '../model/note.model';

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

    getNotesBySchoolId(month: string, schoolId: number){
        return this.getNoteByMonth(month, schoolId);
    }

    getNoteByID(noteId: string){
        return this.http.get<INote>(`${this.API}/note/${noteId}`)
        .pipe(take(1));
    }

    getNoteByMonth(month: string, schoolId?: number){
        if(schoolId){
            return this.http.get<any>(`${this.API}/notes/${month}/${schoolId}`)
            .pipe(take(1));
        }else{
            return this.http.get<any>(`${this.API}/notes/${month}`)
            .pipe(take(1));
        }
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

    exportNotesToExcel(notes?: INote[]){
        return this.http.get(`${this.API}/exportExcel`,
        {
            responseType: 'blob' as 'json'
        })
        .pipe(take(1));
    }
}
