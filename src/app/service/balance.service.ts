import { take } from 'rxjs/operators';
import { IBalance } from 'src/app/model/balance.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BalanceService {

    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getAll(){
        return this.http.get<IBalance[]>(`${this.API}/getAllBalances`)
        .pipe(take(1));
    }

    getById(balanceId: number){
        return this.http.get<IBalance>(`${this.API}/getBalance/${balanceId}`)
        .pipe(take(1));
    }

    getTotalByMonth(month: string){
        return this.http.get<any>(`${this.API}/getTotalByMonth/${month}`)
        .pipe(take(1));
    }

    create(balance: IBalance){
        return this.http.post<IBalance>(`${this.API}/createBalance`, balance)
        .pipe(take(1));
    }

    update(balance: IBalance){
        return this.http.put<IBalance>(`${this.API}/updateBalance`, balance)
        .pipe(take(1));
    }
}
