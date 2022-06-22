import { BalanceService } from 'src/app/service/balance.service';
import { Component, OnInit } from '@angular/core';
import { ISchool } from 'src/app/model/school.model';
import { INote } from 'src/app/model/note.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/service/note.service';
import { SchoolService } from 'src/app/service/school.service';

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
    monthExpenses: number = 0;
    schoolExpenses: number = 0;
    totalBalance: number = 0;
    partialBalance: number = 0;


    constructor(
        private activeRoute: ActivatedRoute,
        private noteService: NoteService,
        private schoolService: SchoolService,
        private balanceService: BalanceService
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
            this.monthExpenses = Number(monthDetail.sumValues.SumValues);
            this.balanceService.getTotalByMonth(this.monthString)
            .subscribe(res => {
                this.totalBalance = res.TotalBalance !== null ? res.TotalBalance : 0;
                this.partialBalance = this.totalBalance - this.monthExpenses;
        });
        });

    }

    getSchoolName(schoolId: number) {
        return this.schoolList
            .find(school => school.SCHOOL_ID === schoolId).SCHOOL_NAME;
    }

    exportToExcel(){
        this.noteService.exportNotesToExcel(this.noteList, this.monthExpenses)
        .subscribe((res: Blob) => {
            const file = new Blob([res], {
                type: res.type
            });
            const blob = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = blob;
            const now = new Date;
            link.download = `ListaNotas_${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}.xlsx`;
            link.click();
            window.URL.revokeObjectURL(blob);
            link.remove();
        });
    }

    pageChanged(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedNoteList = this.noteList.slice(startItem, endItem);
    }

    onChange(event){
        let schoolId: number = Number(event.target.value);
        this.noteService.getNotesBySchoolId(this.monthString, schoolId)
        .subscribe(noteList => {
            this.noteList = noteList.notes;
            this.returnedNoteList = this.noteList.slice(0, this.PAGELENGTH);
            if(schoolId === 0){
                this.schoolExpenses = 0;
            }else{
                this.schoolExpenses = Number(noteList.sumValues.SumValues);
            }
        })
    }

    setClassMonthBalance(): string{
        return this.partialBalance < 0 ? 'text-danger' : '';
    }

}
