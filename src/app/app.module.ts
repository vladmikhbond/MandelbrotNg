import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {PictureComponent} from './picture.component';

@NgModule({
  declarations: [
    AppComponent, PictureComponent
  ],
  imports: [
    BrowserModule, NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
