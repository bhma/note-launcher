import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    
    isMonth: boolean = false;
    monthString: string = '';
    

    constructor(
        private activeRoute: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.isMonth = queryParams.isMonth;
            this.monthString = queryParams.monthString;
        });

        if(this.isMonth){
            console.log(this.isMonth, this.monthString);
        }
    }

}
