import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISchool } from '../model/school.model';
import { take } from 'rxjs/operators';
import { setHeader } from './ConfigHeader';

@Injectable({
    providedIn: 'root'
})
export class SchoolService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getSchools(){
        return this.http.get<ISchool[]>(`${this.API}/schools`, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    getSchoolById(schoolId: string){
        return this.http.get<ISchool>(`${this.API}/school/${schoolId}`, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    createSchool(school: ISchool){
        return this.http.post<ISchool>(`${this.API}/createSchool`, school, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

    updateSchool(school: ISchool){
        return this.http.put<ISchool>(`${this.API}/updateSchool`, school, {
            headers: setHeader()
        })
        .pipe(take(1));
    }

}
