import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { BikerscontractService } from './bikerscontract.service';
import { routing } from './app.routing';
import { BecomeComponent } from './become/become.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainWrapperComponent,
    MainFooterComponent,
    BecomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    BikerscontractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
