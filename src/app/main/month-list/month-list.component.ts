import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IMonth } from 'src/app/model/month.model';
import { MonthService } from 'src/app/service/month.service';

@Component({
    selector: 'app-month-list',
    templateUrl: './month-list.component.html',
    styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

    PAGELENGTH: number = 12;
    MAXSIZE: number = 5;
    monthList: Array<IMonth> = new Array<IMonth>();
    returnedMonthList: Array<IMonth> = new Array<IMonth>();

    constructor(
        private router: Router,
        private monthService: MonthService
    ) { }

    ngOnInit(): void {
        this.monthService.getMonths()
        .subscribe(months => {
            this.monthList = months;
            this.returnedMonthList = this.monthList.slice(0, this.PAGELENGTH);
        });
    }

    navigate(month: string) {
        this.router.navigate(['/noteListMonth'], {queryParams: {
            'isMonth': true,
            'monthString': month
        }});
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedMonthList = this.monthList.slice(startItem, endItem);
    }

}
