import { Component, OnInit } from '@angular/core';
import { ISchool } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';

@Component({
    selector: 'app-school-list',
    templateUrl: './school-list.component.html',
    styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

    schoolList: ISchool[];

    constructor(
        private schoolService: SchoolService
    ) { }

    ngOnInit(): void {
    }

}
