import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMonth } from 'src/app/model/month.model';
import { MonthService } from 'src/app/service/month.service';

@Component({
    selector: 'app-month-list',
    templateUrl: './month-list.component.html',
    styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

    monthList: IMonth[];

    constructor(
        private router: Router,
        private monthService: MonthService
    ) { }

    ngOnInit(): void {
        this.monthService.getMonths()
        .subscribe(months => {
            this.monthList = months;
        });
    }

    navigate(month: string) {
        this.router.navigate(['/noteListMonth'], {queryParams: {
            'isMonth': true,
            'monthString': month
        }});
    }

}
