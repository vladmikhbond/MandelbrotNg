import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService} from './window.service';

@Component({
  selector: 'app-root',
  styles: [
  `input {
      width: 100px;
      text-align: right;
    }`,
    `span {
      margin-left: 5px;
      margin-right: 5px;
    }`
    ],
  template: `
    <div>
      <app-picture></app-picture>
      <div>
        <input type="range" #limit [value]="win.iterLimit" (change)="onLimitChange(+limit.value)" min="20" max="2000" step="20" title="limit">
        <span>{{limit.value}}</span>
        <span>scale: 1:{{win.scale}}</span>
        <span>time: {{elapsedTime}}</span>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  constructor(public win: WindowService) {}

  get elapsedTime() {
     if (this.picture) {
       return this.picture.elapsedTime / 1000;
     }
     return 0;
  }

  onLimitChange(newLimit: number) {
    this.win.iterLimit = newLimit;
    this.picture.draw();
  }


}
