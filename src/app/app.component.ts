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

  help = `Каждой точке плоскости (x, y) в результате некоторых вычислений можно сопоставить целое число h >= 0.
В результате получается некий рельеф, как на местности. Рельеф можно "срезать" плоскостью, параллельной xOy на высоте h0 от нее. Полученный разрез закрашен на экране темным цветом, остальные точки светлые.

Вычисления следующие.

Точка (x, y) трактуется как комплексное число C = x + iy.
Для каждой точки плоскости последовательно вычисляются:
z0 = C
z1 = z0**2 + C
z2 = z1**2 + C
z3 = z2**2 + C
...
до тех пор, пока zH не окажется за пределами окружности с центром в начале координат и радиусом 2.
Номер итерации H и будет результатом вычислений.
Возможно, что что после большого числа итераций, скажем N, zN по прежнему будет оставаться внутри круга с радиусом 2.
Тогда будем возвращать N в качестве результата - условную "бесконечность".
------
Клик мышью - увеличение в 10 раз
Ctrl-Z - откат назад
Синий слайдер - высота среза
`;

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
