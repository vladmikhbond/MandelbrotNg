import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {PictureComponent} from './picture.component';

@NgModule({
  declarations: [
    AppComponent, PictureComponent
  ],
  imports: [
    BrowserModule, NgbDropdownModule, NgbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
