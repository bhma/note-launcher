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
}
