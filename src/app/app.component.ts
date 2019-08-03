import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService} from './window.service';

@Component({
  selector: 'app-root',
  styles: [
      `#limits {
        display: inline-block;
        border: thick solid lightblue;
    }`
    ,
      `#limits input {
      width: 100px;
      height: 26px;
      margin: 5px 0px 5px 5px;
      -webkit-appearance: none;
      background-color: lightblue;
    }`
    ,
      `#limits span {
      display: inline-block;
      width: 50px;
      margin: 5px 5px 5px 5px;
      background-color: lightblue;
      text-align: center;
      vertical-align: bottom;
    }`
    ,
    `#colors{
        display: inline-block;
        border: thick solid lightblue;
        margin: 0 0 0 20px;
    }`
    ,
    `#colors input {
      margin: 5px 0px 5px 0px;
      width: 40px;
    }`
    ,
      `#colors button {
      margin: 0 5px 0 5px;
    }`
    ],
  template: `
      <app-picture></app-picture>
      <table>
        <tr>
          <td>
            <div id="limits">
              <input type="range" #limit [value]="win.iterLimit" (mousemove)="f()" (change)="onLimitChange(+limit.value)"
                     min="20" max="2000" step="20" title="limit">
              <span>{{limit.value}}</span>
            </div>

          </td>
          <td>
            <div id="colors">
              <input type="color" #darkColor title="Dark Color" value="#000000" >
              <input type="color" #lightColor title="Light Color" value="#FFFFFF" >
              <input type="color" #thirdColor title="Third Color" value="#FFFFFF" >

              <div ngbDropdown class="d-inline-block">
                <button class="btn btn-link" id="schemaDropdown" ngbDropdownToggle>{{colorSchemaName}}</button>
                <div ngbDropdownMenu aria-labelledby="schemaDropdown">
                  <button ngbDropdownItem *ngFor="let s of ['Plain', 'Fiery', 'Zebra', 'Smooth']; index as i;"
                          (click)="g(i, s, darkColor.value, lightColor.value, thirdColor.value)" >{{s}}</button>
                </div>
              </div>
            </div>

          </td>
        </tr>
        <tr>
          <td>
              <span id="scaleSpan" title="Scale">1:{{win.scale}}</span>
          </td>
          <td>
              <span id="elapsedTime" title="elapsedTime">{{elapsedTime}}</span>
          </td>
        </tr>
    </table>
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
