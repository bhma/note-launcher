import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

    showMenu: boolean = false;
    constructor(
        private authServ: AuthService
    ) { }

    ngOnInit(): void {
        const subscription = this.authServ.showMenuEmitter.subscribe(
            show => {
                this.showMenu = show;
            }
        );
    }

}
