import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService, INFINITY} from './window.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent {

  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  colorSchemaName = 'Plain';

  help =
`Клик мышью - увеличение в 10 раз
Ctrl-Z - откат назад
Синий слайдер - высота среза
`;
  infinity = INFINITY;

  constructor(public win: WindowService) {}

  get elapsedTime() {
     if (this.picture) {
       return this.picture.elapsedTime;
     }
     return '';
  }

  ////////////////// event handlers /////////////////////////

  limit_change(newLimit: number) {
    this.win.iterLimit = newLimit;
    this.picture.draw();
  }

  // Do not delete! Needs for ng recalculation range.value
  f() { }

  schema_click(schemaNo: number, schemaName: string, dark: string, light: string, third: string) {

    this.picture.colorSchema = {schemaNo, dark, light, third};
    this.colorSchemaName = schemaName;
    this.picture.draw();
  }

  color_change(name: string, value: string) {
    this.picture.colorSchema[name] = value;
    this.picture.draw();
  }

   root_keypress(e: KeyboardEvent) {
     if (e.code === 'KeyZ' && e.ctrlKey) {
       this.win.minify();
       this.picture.draw();
     }
  }

  reset_click() {
    this.win.init();
    this.schema_click(0, 'Plain', '#000000', '#FFFFFF', '#FF0000');
    this.win.fillMatrix();
    this.picture.draw();
  }
}
