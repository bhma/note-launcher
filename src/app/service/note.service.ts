import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    getNoteByID(noteId: string){
        return this.http.get<INote>(`${this.API}/note/${noteId}`)
        .pipe(take(1));
    }

    createNote(note: INote){
        return this.http.post<INote>(`${this.API}/createNote`, note)
        .pipe(take(1));
    }
}
