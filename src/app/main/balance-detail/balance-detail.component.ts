import { AlertService, LIFETIMENOTIFY, STRSUCCESS, STRDANGER } from 'src/app/service/alert.service';
import { BalanceService } from 'src/app/service/balance.service';
import { IBalance } from './../../model/balance.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISchool } from 'src/app/model/school.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-balance-detail',
    templateUrl: './balance-detail.component.html',
    styleUrls: ['./balance-detail.component.scss']
})
export class BalanceDetailComponent implements OnInit {

    formBalance: FormGroup;
    schoolList: ISchool[];
    balance: IBalance;
    isEdited: boolean;

    constructor(
        private modalRef: BsModalRef,
        private formBd: FormBuilder,
        private balanceServ: BalanceService,
        private alertServ: AlertService
    ) { }

    ngOnInit(): void {
        this.formBalance = this.formBd.group({
            schoolId: [this.balance ? this.balance.SCHOOL_ID : 0, Validators.required],
            ocurrenceDate: [this.balance ? this.balance.CREATED_ON : null, Validators.required],
            value: [this.balance? this.balance.VALUE : null, Validators.required]
        });
    }

    save(isDelete: boolean){
        if(this.balance){
            this.balance = {
                BALANCE_ID: this.balance.BALANCE_ID,
                CREATED_ON: this.formBalance.get('ocurrenceDate').value,
                OCCURRENCE_MONTH: String(this.formBalance.get('ocurrenceDate').value).substr(0,7),
                SCHOOL_ID: this.formBalance.get('schoolId').value,
                VALUE: this.formBalance.get('value').value,
                IS_ACTIVE: !isDelete
            }
            this.balanceServ.update(this.balance)
            .subscribe(res => {
                console.log(res);
                if(res){
                    this.notify('Entrada atualizada com sucesso!', LIFETIMENOTIFY, STRSUCCESS);
                }else{
                    this.notify('Houve um problema ao atualizar a entrada.', LIFETIMENOTIFY, STRDANGER);
                }
            });
        }else{
            this.balance = {
                BALANCE_ID: 0,
                CREATED_ON: this.formBalance.get('ocurrenceDate').value,
                OCCURRENCE_MONTH: String(this.formBalance.get('ocurrenceDate').value).substr(0,7),
                SCHOOL_ID: this.formBalance.get('schoolId').value,
                VALUE: this.formBalance.get('value').value,
                IS_ACTIVE: true
            }
            this.balanceServ.create(this.balance)
            .subscribe(res => {
                console.log(res);
                if(res){
                    this.notify('Entrada cadastrada com sucesso!', LIFETIMENOTIFY, STRSUCCESS);
                }else{
                    this.notify('Houve um problema ao cadastrar a entrada.', LIFETIMENOTIFY, STRDANGER);
                }
            });
        }
        this.closeModal();
    }

    closeModal(){
        this.isEdited = !this.formBalance.pristine;
        this.modalRef.hide();
    }

    notify(msg: string, tempoVida: number, color: string){
        this.alertServ.newAlert(msg, tempoVida, color);
    }

}
