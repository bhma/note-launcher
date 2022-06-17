import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { Alerta, AlertaAcao } from '../shared/alert/alert.component';

export const STRSUCCESS: string = 'success';
export const STRDANGER: string = 'danger';
export const STRINFO: string = 'info';
export const LIFETIMENOTIFY: number = 100;

export interface AlertConfig {
    msg: string,
    type: string;
    dismissible: boolean;
    dismissOnTimeout: number;
    isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {



    alerts = new Subject<AlertaAcao>();

    constructor() { }

    getAlerts(): Observable<AlertaAcao>{
        return this.alerts.asObservable();
    }

    newAlert(msg: string, tempoVida?: number, color?: string){
        const objAlerta: Alerta = {
            mensagem: msg,
            color: color,
            tempoDeVidaSeg: tempoVida
        };

        this.alerts.next({
            acao: 'novo',
            alerta: objAlerta
        });

        if(objAlerta.tempoDeVidaSeg){
            //calcula tempo de vida em milisegundos e
            //dispara um timer.
            timer(objAlerta.tempoDeVidaSeg * 100)
            .subscribe(() => {
                this.removeAlert(objAlerta);
            });
        }
    }

    removeAlert(alert: Alerta){
        this.alerts.next({
            acao: 'remover',
            alerta: alert
        });
    }

    removeAllAlerts(){
        this.alerts.next({
            acao: 'remover-todos'
        })
    }
}
