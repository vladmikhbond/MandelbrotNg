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
      display: inline-block;
      width: 50px;
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
        <span id="scaleSpan" title="Scale">1:{{win.scale}}</span>

        <div ngbDropdown class="d-inline-block">
          <button class="btn btn-outline-primary" id="schemaDropdown" ngbDropdownToggle>{{colorSchemaName}}</button>
          <div ngbDropdownMenu aria-labelledby="schemaDropdown">
            <button ngbDropdownItem (click)="g(0, 'Plain')" >Plain</button>
            <button ngbDropdownItem (click)="g(1, 'Fiery')" >Fiery</button>
            <button ngbDropdownItem (click)="g(2, 'Zebra')" >Zebra</button>
            <button ngbDropdownItem (click)="g(3, 'Smooth')" >Smooth</button>
          </div>

          <input type="color" id="darkColor" title="Dark Color" value="#000000" >
          <input type="color" id="lightColor" title="Light Color" value="#FFFFFF" >
          <input type="color" id="thirdColor" title="Third Color" value="#FFFFFF" >
        </div>
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
       return this.picture.elapsedTime / 1000;
     }
     return 0;
  }

  onLimitChange(newLimit: number) {
    this.win.iterLimit = newLimit;
    this.picture.draw();
  }

  // Do not delete! Needs for ng recalculation range.value
  f() { }

  g(schemaNo: number, schemaName: string) {
    console.log(schemaNo);
    this.picture.colorSchema = schemaNo;
    this.colorSchemaName = schemaName;
    this.picture.draw();
    // setTimeout(() => this.picture.draw(), 200);
  }
}
