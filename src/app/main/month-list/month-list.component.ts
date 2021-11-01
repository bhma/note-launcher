import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonthService } from 'src/app/service/month.service';

@Component({
    selector: 'app-month-list',
    templateUrl: './month-list.component.html',
    styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

    monthList: string[] = [];

    constructor(
        private router: Router,
        private monthService: MonthService
    ) { }

    ngOnInit(): void {
    }

    navigate(month: string) {
        this.router.navigate(['/noteListMonth'], {queryParams: {
            'isMonth': true,
            'monthString': month
        }});
    }

}
