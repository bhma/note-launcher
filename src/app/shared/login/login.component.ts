import { HttpErrorResponse } from '@angular/common/http';
import { AlertService, LIFETIMENOTIFY, STRDANGER } from './../../service/alert.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { throwError } from 'rxjs';
import { JwtAuth } from 'src/app/model/jwtAuth.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(
        private authServ: AuthService,
        private fb: FormBuilder,
        private alertServ: AlertService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    login() {
        try {
            this.authServ.login({
                username: this.loginForm.get('username').value,
                password: this.loginForm.get('password').value
            })
            .subscribe(
                (next: JwtAuth) => {
                    localStorage.setItem(environment.TOKEN_NAME, next.token);
                },
                (error: HttpErrorResponse) => {
                    this.notify('Dados inválidos', LIFETIMENOTIFY, STRDANGER);
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    notify(msg: string, tempoVida: number, color: string){
        this.alertServ.newAlert(msg, tempoVida, color);
    }

}
