import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISchool } from '../model/school.model';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SchoolService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getSchools(){
        return this.http.get<ISchool[]>(`${this.API}/schools`)
        .pipe(take(1));
    }

    getSchoolById(schoolId: string){
        return this.http.get<ISchool>(`${this.API}/school/${schoolId}`)
        .pipe(take(1));
    }

}
