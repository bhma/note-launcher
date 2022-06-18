import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
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

    PAGELENGTH: number = 6;
    MAXSIZE: number = 5;

    noteList: Array<INote> = new Array<INote>();;
    returnedNoteList: Array<INote> = new Array<INote>();;
    schoolList: ISchool[];
    isMonth: boolean = false;
    monthString: string = '';
    sumValues: number;


    constructor(
        private schoolService: SchoolService,
        private activeRoute: ActivatedRoute,
        private noteService: NoteService,
        private monthService: MonthService
    ) {

    }

    ngOnInit(): void {
        this.schoolService.getSchools()
        .subscribe(schools => {
            this.schoolList = schools;
        });
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.isMonth = queryParams.isMonth;
            this.monthString = queryParams.monthString;
        });



        if (this.isMonth) {
            // chamar o end-point getNotesByMonth
            this.noteService.getNoteByMonth(this.monthString)
            .subscribe(monthDetail => {
                this.noteList = monthDetail.notes;
                this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
                this.sumValues = Number(monthDetail.sumValues.SumValues);
            });
        } else {
            this.noteService.getNotes()
            .subscribe(notes => {
                this.noteList = notes;
                this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
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

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedNoteList = this.noteList.slice(startItem, endItem);
    }

}
