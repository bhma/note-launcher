import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INote } from 'src/app/model/note.model';
import { MonthService } from 'src/app/service/month.service';
import { NoteService } from 'src/app/service/note.service';


@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

    noteList: INote[];
    isMonth: boolean = false;
    monthString: string = '';


    constructor(
        private activeRoute: ActivatedRoute,
        private noteService: NoteService,
        private monthService: MonthService
    ) {

    }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.isMonth = queryParams.isMonth;
            this.monthString = queryParams.monthString;
        });

        if (this.isMonth) {
            console.log(this.isMonth, this.monthString);
        } else {
            this.noteService.getNotes()
                .subscribe(notes => {
                    this.noteList = notes;
                });
        }
    }

}
