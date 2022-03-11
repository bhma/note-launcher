import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INote } from 'src/app/model/note.model';
import { ISchool } from 'src/app/model/school.model';
import { MonthService } from 'src/app/service/month.service';
import { NoteService } from 'src/app/service/note.service';
import { SchoolService } from 'src/app/service/school.service';


@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

    noteList: INote[];
    schoolList: ISchool[];
    isMonth: boolean = false;
    monthString: string = '';
    sumValues: number;


    constructor(
        private activeRoute: ActivatedRoute,
        private noteService: NoteService,
        private schoolService: SchoolService,
        private monthService: MonthService
    ) {

    }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.isMonth = queryParams.isMonth;
            this.monthString = queryParams.monthString;
        });

        this.schoolService.getSchools()
        .subscribe(schools => {
            this.schoolList = schools;
        });

        if (this.isMonth) {
            // chamar o end-point getNotesByMonth
            this.noteService.getNoteByMonth(this.monthString)
            .subscribe(monthDetail => {
                this.noteList = monthDetail.notes;
                this.sumValues = Number(monthDetail.sumValues.SumValues);
            });
        } else {
            this.noteService.getNotes()
            .subscribe(notes => {
                this.noteList = notes;
            });
        }
    }

    getSchoolName(schoolId: number) {
        return this.schoolList
            .find(school => school.SCHOOL_ID === schoolId).SCHOOL_NAME;
    }

    exportToExcel(){
        // this.noteService.exportNotesToExcel(this.noteList);
    }

}
