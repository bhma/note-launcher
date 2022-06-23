import { IBalance } from './../model/balance.model';
import { ISchool } from './../model/school.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { INote } from '../model/note.model';
import { setHeader } from './ConfigHeader';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getNotes(){
        return this.http.get<INote[]>(`${this.API}/notes`, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    getNotesBySchoolId(month: string, schoolId: number){
        return this.getNoteByMonth(month, schoolId);
    }

    getNoteByID(noteId: string){
        return this.http.get<INote>(`${this.API}/note/${noteId}`, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    getNoteByMonth(month: string, schoolId?: number){
        if(schoolId){
            return this.http.get<any>(`${this.API}/notes/${month}/${schoolId}`, {
                headers: setHeader()
            })
            .pipe(take(1));
        }else{
            return this.http.get<any>(`${this.API}/notes/${month}`, {
                headers: setHeader()
            })
            .pipe(take(1));
        }
    }

    createNote(note: INote){
        return this.http.post<INote>(`${this.API}/createNote`, note, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    createManyNotes(notes: INote[]){
        return this.http.post<INote>(`${this.API}/createManyNotes`, notes, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    updateNote(note: INote){
        return this.http.put<INote>(`${this.API}/updateNote`, note, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    exportNotesToExcel(noteList: INote[], total: number, schList: ISchool[], balances: IBalance[]){
        return this.http.post(`${this.API}/exportExcel`, {
            noteList,
            total,
            schList,
            balances
        }, {
            headers: setHeader(),
            responseType: 'blob' as 'json'
        })
        .pipe(take(1));
    }


}
