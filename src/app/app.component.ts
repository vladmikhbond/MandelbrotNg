import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService} from './window.service';

@Component({
  selector: 'app-root',
  styles: [
      `input[type='color'] {
      width: 40px;
    }`
    ,
    `input[type='range'] {
      width: 100px;
      /*overflow: hidden;*/
      -webkit-appearance: none;
      background-color: lightblue;
    }`
    ,
      `#limitSpan {
      margin: 0 5px 0 5px;
      display: inline-block;
      width: 50px;
      border: thin solid blue;
      background-color: lightblue;
      text-align: center;

    }`
    ,
      `#scaleSpan {
      margin: 0 5px 0 5px;
      padding-left: 5px;
      padding-right: 5px;
      /*display: inline-block;*/

      border: thin solid gray;
      text-align: center;
    }`
    ,
      `#colorSpan {
      margin: 0 5px 0 50px;
      border: thin solid gray;
      text-align: center;
    }`
    ,
      `#schemaDropdown {
      margin: 0 5px 0 5px;
      height: 30px;
    }`
    ],
  template: `
    <div>
      <app-picture></app-picture>
      <div>
        <input type="range" #limit [value]="win.iterLimit" (mousemove)="f()" (change)="onLimitChange(+limit.value)" min="20" max="2000" step="20" title="limit">

        <span id="limitSpan">{{limit.value}}</span>

        <span id="colorSpan" >
          <input type="color" #darkColor title="Dark Color" value="#000000" >
          <input type="color" #lightColor title="Light Color" value="#FFFFFF" >
          <input type="color" #thirdColor title="Third Color" value="#FFFFFF" >
        </span>

        <div ngbDropdown class="d-inline-block">
          <button class="btn btn-outline-primary" id="schemaDropdown" ngbDropdownToggle>{{colorSchemaName}}</button>
          <div ngbDropdownMenu aria-labelledby="schemaDropdown">
            <button ngbDropdownItem *ngFor="let s of ['Plain', 'Fiery', 'Zebra', 'Smooth']; index as i;"
                    (click)="g(i, s, darkColor.value, lightColor.value, thirdColor.value)" >{{s}}</button>
          </div>
        </div>
      </div>
      <div>
        <span id="scaleSpan" title="Scale">1:{{win.scale}}</span>
        <span id="elapsedTime" title="elapsedTime">{{elapsedTime}}</span>
      </div>
    </div>
  `
})
export class AppComponent {

  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  colorSchemaName = 'Plain';

  constructor(public win: WindowService) {}

  get elapsedTime() {
     if (this.picture) {
       return this.picture.elapsedTime;
     }
     return '';
  }

  onLimitChange(newLimit: number) {
    this.win.iterLimit = newLimit;
    this.picture.draw();
  }

  // Do not delete! Needs for ng recalculation range.value
  f() { }

  g(schemaNo: number, schemaName: string, dark: string, light: string, third: string) {

    this.picture.colorSchema = {schemaNo, dark, light, third};
    this.colorSchemaName = schemaName;
    this.picture.draw();
  }
}
