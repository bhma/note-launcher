import { SchoolService } from 'src/app/service/school.service';
import { BalanceService } from 'src/app/service/balance.service';
import { ISchool } from './../../model/school.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IBalance } from './../../model/balance.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BalanceDetailComponent } from '../balance-detail/balance-detail.component';

@Component({
    selector: 'app-balance-list',
    templateUrl: './balance-list.component.html',
    styleUrls: ['./balance-list.component.scss']
})
export class BalanceListComponent implements OnInit {

    PAGELENGTH: number = 6;
    MAXSIZE: number = 5;
    balanceList: IBalance[] = [];
    pagedBalanceList: IBalance[] = [];
    schoolList: ISchool[] = [];

    bsModalRef: BsModalRef;

    constructor(
        private balanceServ: BalanceService,
        private schoolServ: SchoolService,
        private modalServ: BsModalService
    ) { }

    ngOnInit(): void {
        this.loadData(true);
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.pagedBalanceList = this.balanceList.slice(startItem, endItem);
    }

    getSchoolName(schoolId: number): string {
        return this.schoolList
            .find(school => school.SCHOOL_ID === schoolId).SCHOOL_NAME;
    }

    openModal(){
        this.bsModalRef = this.modalServ.show(BalanceDetailComponent, {
            initialState: {
                schoolList: this.schoolList,
                isEdited: false
            }
        });
        const subscription = this.bsModalRef.onHide
        .subscribe(res => {
            this.loadData(false);
            subscription.unsubscribe();
        });

    }

    editBalance(balance: IBalance){
        this.bsModalRef = this.modalServ.show(BalanceDetailComponent, {
            initialState: {
                balance: balance,
                schoolList: this.schoolList,
                isEdited: false
            }
        });
        const subscription = this.bsModalRef.onHide
        .subscribe(res => {
            this.loadData(false);
            subscription.unsubscribe();
        });
    }

    loadData(loadSchoolList: boolean){
        if(loadSchoolList){
            this.schoolServ.getSchools()
            .subscribe(schools => {
                this.schoolList = schools;
            });
        }
        this.balanceServ.getAll()
        .subscribe(balances => {
            this.balanceList = balances;
            this.pagedBalanceList = this.balanceList.slice(0, this.PAGELENGTH);
        });
    }

}
