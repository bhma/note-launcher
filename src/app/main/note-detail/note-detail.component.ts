import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { INote } from 'src/app/model/note.model';
import { ISchool } from 'src/app/model/school.model';
import { NoteService } from 'src/app/service/note.service';
import { SchoolService } from 'src/app/service/school.service';
import pt from '@angular/common/locales/pt-PT'

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

    noteId: string;
    schoolList: ISchool[];
    formNote: FormGroup;

    constructor(
        private noteService: NoteService,
        private formBuilder: FormBuilder,
        private actRoute: ActivatedRoute,
        private schoolService: SchoolService
    ) { }

    ngOnInit(): void {
        this.formNote = this.formBuilder.group({
            ocurrenceDate: [null],
            value: [null],
            schoolId: [null],
            description: [null]
        });

        this.schoolService.getSchools()
        .subscribe(schools => {
            this.schoolList = schools;
        });

        this.actRoute.params.subscribe(params => {
            this.noteId = params.id;
        });

        if (this.noteId !== 'newNote') {
            this.noteService.getNoteByID(this.noteId)
                .subscribe(note => {
                    this.formNote.setValue({
                        ocurrenceDate: note.OCCURRENCE_DATE,
                        value: note.VALUE,
                        schoolId: note.SCHOOL_ID,
                        description: note.DESCRIPTION
                    });
                })
        }
    }

    createNote(){
        
    }

}
