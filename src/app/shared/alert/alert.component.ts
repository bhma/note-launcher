import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';

export type AlertaAcao = {
    acao: 'novo' | 'remover' | 'remover-todos',
    alerta?: Alerta
};

export type Alerta = {
    mensagem: string,
    color?: string,
    tempoDeVidaSeg?: number
}



@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    alertList: Array<Alerta> = new Array<Alerta>();

    constructor(
        private alertService: AlertService
    ) {
        this.alertService.getAlerts()
            .subscribe((alertaAcao: AlertaAcao) => {
                switch (alertaAcao.acao) {
                    case 'novo':
                        this.alertList.push(alertaAcao.alerta);
                        break;
                    case 'remover':
                        this.alertList = this.alertList.filter(alert => {
                            return alert !== alertaAcao.alerta;
                        });
                        break;
                    default:
                        this.alertList = [];
                        break;
                }
            });
    }

    remover(alert: Alerta) {
        this.alertService.removeAlert(alert);
    }

    getBg(color: string) {
        let classBg: string;
        switch (color) {
            case 'success':
                classBg = 'bg-green';
                break;
            case 'danger':
                classBg = 'bg-red';
                break;
            default:
                classBg = 'bg-yellow';
                break;
        }
        return classBg;
    }
}
