import {Component, ViewChild} from '@angular/core';
import {PictureComponent} from './picture.component';
import {WindowService} from './window.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent {

  @ViewChild(PictureComponent, {static: false})
  picture: PictureComponent;

  colorSchemaName = 'Plain';

  help = `Click - увеличение в 10 раз
Ctrl-Z - откат назад
слайдер - разрешение`;

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

  h(name: string, value: string) {
    this.picture.colorSchema[name] = value;
    this.picture.draw();
  }

   onKeyPress(e: KeyboardEvent) {
     if (e.code === 'KeyZ' && e.ctrlKey) {
       this.win.historyBack();
       this.picture.draw();
     }
  }
}
