import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';

@Component({
  selector: 'app-root',
  template: `
    <app-picture></app-picture>
    <div>
      <button (click)="onClick($event)">Clock</button>
    </div>
  `,
  styles: ['']
})
export class AppComponent {
  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  onClick(e: MouseEvent) {
  }
}
