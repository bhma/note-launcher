import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-month-list',
    templateUrl: './month-list.component.html',
    styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

    constructor(
        private router: Router
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
