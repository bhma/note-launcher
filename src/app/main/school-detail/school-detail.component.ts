import { NoteService } from './../../service/note.service';
import { INote } from './../../model/note.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolService } from 'src/app/service/school.service';
import { ISchool } from 'src/app/model/school.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'app-school-detail',
    templateUrl: './school-detail.component.html',
    styleUrls: ['./school-detail.component.scss']
})
export class SchoolDetailComponent implements OnInit {

    PAGELENGTH: number = 8;
    MAXSIZE: number = 5;
    currentPage: number = 1;

    formSchool: FormGroup;
    formNote: FormGroup;
    schoolId: string;
    noteList: Array<INote> = new Array<INote>();
    returnedNoteList: Array<INote> = new Array<INote>();

    page: number = 0;
    startIndex: number = 0;

    constructor(
        private schoolService: SchoolService,
        private noteService: NoteService,
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

        this.formNote = this.formBuilder.group({
            ocurrenceDate: [null],
            value: [null],
            description: [null],
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

    addNoteList(){
        this.noteList.push({
            NOTE_ID : 0,
            OCCURRENCE_DATE : this.formNote.get('ocurrenceDate').value,
            OCCURRENCE_MONTH : String(this.formNote.get('ocurrenceDate').value).substr(0,7),
            VALUE : Number(this.formNote.get('value').value),
            SCHOOL_ID : Number(this.schoolId),
            DESCRIPTION : this.formNote.get('description').value,
            IS_ACTIVE : this.formNote.get('isActive').value
        });
        if(this.noteList.length <= this.PAGELENGTH){
            this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
        }else{

            let ceilValidation = Math.ceil(this.noteList.length / this.PAGELENGTH);
            if(ceilValidation > this.page){
                this.page = ceilValidation;
                this.currentPage = this.page;
                this.startIndex = this.noteList.length;
            }
            this.returnedNoteList = this.noteList.slice(this.startIndex - 1);

        }
    }

    rmNoteList(note: INote){
        let position = this.noteList.indexOf(note);
        this.noteList.splice(position, 1);
    }

    getSchoolName(){
        return this.formSchool.get('schoolName').value;
    }

    showNoteList(){
        return this.noteList.length === 0 ? true : false;
    }

    showPaginationNoteList(){
        return this.noteList.length > this.PAGELENGTH;
    }

    getNoteListLength(){
        return this.noteList.length;
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedNoteList = this.noteList.slice(startItem, endItem);
    }

    saveNotes(){
        console.log(this.noteList);
        this.noteService.createManyNotes(this.noteList)
        .subscribe(res => {
            console.log(res);
        });
        this.noteList = [];
        this.formNote.reset();
    }

}
