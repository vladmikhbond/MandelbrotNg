import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService} from './window.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-picture (keydown)="onKeyDown($event)"  tabindex="1"></app-picture>
      <div>
        <input #limit [value]="win.iterLimit" >
        <button (click)="onClick(+limit.value)">Limit</button>
        <span>{{win.scale}}</span>
      </div>
    </div>
  `,
  styles: [
    `input {
      width: 50px;
      text-align: right;
    }
    `
  ]
})
export class AppComponent {
  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  constructor(private win: WindowService) {
  }


  onClick(newLimit: number) {
    this.win.iterLimit = newLimit;
    this.picture.draw();
  }


  onKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();

    if (e.ctrlKey && key === 'z') {
        alert(key);
    }
  }
}
