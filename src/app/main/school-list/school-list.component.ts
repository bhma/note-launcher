import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ISchool } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';

@Component({
    selector: 'app-school-list',
    templateUrl: './school-list.component.html',
    styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

    PAGELENGTH: number = 6;
    MAXSIZE: number = 5;

    schoolList: Array<ISchool> = new Array<ISchool>();
    returnedSchoolList: Array<ISchool> = new Array<ISchool>();

    constructor(
        private schoolService: SchoolService
    ) { }

    ngOnInit(): void {
        this.schoolService.getSchools()
        .subscribe((schools) => {
            this.schoolList = schools;
            this.returnedSchoolList = this.schoolList.slice(0, this.PAGELENGTH);
        });
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedSchoolList = this.schoolList.slice(startItem, endItem);
    }

}
