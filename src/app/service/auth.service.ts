import { catchError, take, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtAuth } from '../model/jwtAuth.model';
import { ObservableInput, of } from 'rxjs';

export interface IUser{
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    API = environment.API_URL;
    showMenuEmitter = new EventEmitter<boolean>();
    isAuth: boolean = false;
    constructor(
        private http: HttpClient
    ) { }

    login(user: IUser){
        return this.http.post<JwtAuth>(`${this.API}/login`, {
            username: user.username,
            password: user.password
        }).pipe(take(1));
    }

    autenticatedUser(){
        return this.isAuth;
    }
}
