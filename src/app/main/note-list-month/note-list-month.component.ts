import { Component, OnInit } from '@angular/core';
import { ISchool } from 'src/app/model/school.model';
import { INote } from 'src/app/model/note.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/service/note.service';
import { SchoolService } from 'src/app/service/school.service';
import * as EventEmitter from 'events';

@Component({
    selector: 'app-note-list-month',
    templateUrl: './note-list-month.component.html',
    styleUrls: ['./note-list-month.component.scss']
})
export class NoteListMonthComponent implements OnInit {

    PAGELENGTH: number = 6;
    MAXSIZE: number = 5;

    noteList: Array<INote> = new Array<INote>();
    returnedNoteList: Array<INote> = new Array<INote>();
    schoolList: ISchool[];
    isMonth: boolean = false;
    monthString: string = '';
    sumValues: number;
    sumValuesSchool: number;

    constructor(
        private activeRoute: ActivatedRoute,
        private noteService: NoteService,
        private schoolService: SchoolService,
    ) { }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.monthString = queryParams.monthString;
        });

        this.schoolService.getSchools()
        .subscribe(schools => {
            this.schoolList = schools;
        });
        // chamar o end-point getNotesByMonth
        this.noteService.getNoteByMonth(this.monthString)
        .subscribe(monthDetail => {
            this.noteList = monthDetail.notes;
            this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
            this.sumValues = Number(monthDetail.sumValues.SumValues);
        });
    }

    getSchoolName(schoolId: number) {
        return this.schoolList
            .find(school => school.SCHOOL_ID === schoolId).SCHOOL_NAME;
    }

    exportToExcel(){
        // this.noteService.exportNotesToExcel(this.noteList);
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedNoteList = this.noteList.slice(startItem, endItem);
    }

    onChange(event){
        this.noteService.getNotesBySchoolId(this.monthString, event.target.value)
        .subscribe(noteList => {
            this.noteList = noteList.notes;
            this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
            if(event.target.value === 0){
                this.sumValuesSchool = 0;
            }else{
                this.sumValuesSchool = Number(noteList.sumValues.SumValues);
            }
        })
    }

}
