import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolService } from 'src/app/service/school.service';
import { ISchool } from 'src/app/model/school.model';

@Component({
    selector: 'app-school-detail',
    templateUrl: './school-detail.component.html',
    styleUrls: ['./school-detail.component.scss']
})
export class SchoolDetailComponent implements OnInit {

    formSchool: FormGroup;
    schoolId: string;

    constructor(
        private schoolService: SchoolService,
        private formBuilder: FormBuilder,
        private actRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.formSchool = this.formBuilder.group({
            schoolName: [null],
            directorName: [null],
            address: [null],
            isActive: [false]
        });

        this.actRoute.params.subscribe((params) => {
            this.schoolId = params.id
        });

        if (this.schoolId !== 'newSchool') {
            this.schoolService.getSchoolById(this.schoolId)
                .subscribe((school) => {
                    this.formSchool.setValue({
                        schoolName: school.SCHOOL_NAME,
                        directorName: school.DIRECTOR_NAME,
                        address: school.ADDRESS,
                        isActive: school.IS_ACTIVE
                    });
                });
        }
    }

    createUpdateSchool(option: string) {
        const school: ISchool = {
            SCHOOL_ID: 0,
            SCHOOL_NAME: this.formSchool.get('schoolName').value,
            DIRECTOR_NAME: this.formSchool.get('directorName').value,
            ADDRESS: this.formSchool.get('address').value,
            IS_ACTIVE: this.formSchool.get('isActive').value
        }

        if(option === 'create'){
            this.schoolService.createSchool(school)
            .subscribe(res => {
                console.log(res);
            });
        }else if( option === 'update'){
            school.SCHOOL_ID = Number(this.schoolId);
            this.schoolService.updateSchool(school)
            .subscribe(res => {
                console.log(res);
            });
        }
    }

}
