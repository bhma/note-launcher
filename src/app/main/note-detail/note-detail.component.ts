import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INote } from 'src/app/model/note.model';
import { NoteService } from 'src/app/service/note.service';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

    note: INote;
    formNote: FormGroup;

    constructor(
        private noteService: NoteService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formNote = this.formBuilder.group({
            ocurrenceDate: [null],
            value: [null],
            schoolId: [null],
            description: [null]
        });
    }

}
