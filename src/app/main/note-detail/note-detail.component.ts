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
            description: [null],
            isActive: [false]
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
                        description: note.DESCRIPTION,
                        isActive: note.IS_ACTIVE
                    });
                })
        }
    }

    createUpdateNote(option: string){
        const note: INote = {
            NOTE_ID: 0,
            OCCURRENCE_DATE: this.formNote.get('ocurrenceDate').value,
            OCCURRENCE_MONTH: String(this.formNote.get('ocurrenceDate').value).substr(0,7),
            VALUE: this.formNote.get('value').value,
            SCHOOL_ID: this.formNote.get('schoolId').value,
            DESCRIPTION: this.formNote.get('description').value,
            IS_ACTIVE: this.formNote.get('isActive').value
        };

        if(option === 'create'){
            this.noteService.createNote(note)
            .subscribe(res => {
                console.log(res);
            });
        }else if(option === 'update'){
            note.NOTE_ID = Number(this.noteId);
            this.noteService.updateNote(note)
            .subscribe(res => {
                console.log(res);
            });
        }
    }

}
