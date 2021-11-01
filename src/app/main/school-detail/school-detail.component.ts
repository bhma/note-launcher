import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolService } from 'src/app/service/school.service';

@Component({
    selector: 'app-school-detail',
    templateUrl: './school-detail.component.html',
    styleUrls: ['./school-detail.component.scss']
})
export class SchoolDetailComponent implements OnInit {

    formSchool: FormGroup;

    constructor(
        private schoolService: SchoolService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formSchool = this.formBuilder.group({
            schoolName: [null],
            directorName: [null],
            address: [null]
        });
    }

}
