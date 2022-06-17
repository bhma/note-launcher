import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [
    MenuBarComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports:[
      MenuBarComponent,
      FooterComponent,
      AlertComponent
  ]
})
export class SharedModule { }
