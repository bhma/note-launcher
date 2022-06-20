import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MenuBarComponent,
    FooterComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
      MenuBarComponent,
      FooterComponent,
      AlertComponent,
      LoginComponent
  ]
})
export class SharedModule { }
