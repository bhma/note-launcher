import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { IMonth } from '../model/month.model';
import { setHeader } from './ConfigHeader';


@Injectable({
    providedIn: 'root'
})
export class MonthService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getMonths(){
        return this.http.get<IMonth[]>(`${this.API}/months`, {
            headers: setHeader()
        })
        .pipe(take(1));
    }
}
