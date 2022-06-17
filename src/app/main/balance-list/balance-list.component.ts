import { SchoolService } from 'src/app/service/school.service';
import { BalanceService } from 'src/app/service/balance.service';
import { ISchool } from './../../model/school.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IBalance } from './../../model/balance.model';
import { Component, OnInit } from '@angular/core';

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

    constructor(
        private balanceServ: BalanceService,
        private schoolServ: SchoolService
    ) { }

    ngOnInit(): void {
        this.schoolServ.getSchools()
        .subscribe(schools => {
            this.schoolList = schools;
        });
        this.balanceServ.getAll()
        .subscribe(balances => {
            this.balanceList = balances;
            this.pagedBalanceList = this.balanceList.slice(0, this.PAGELENGTH);
        });

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

}
