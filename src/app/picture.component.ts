import {Component, ElementRef, ViewChild} from '@angular/core';
import {MathService} from './math.service';

const K = 2;      // scale change for one step
const D = 1;     // canvas pixel


@Component({
  selector: 'app-picture',
  template: `
    <canvas #canvas width="500" height="300" (mousedown)="onMouseDown($event)"></canvas>
  `,
  styles: [`canvas {
    width: 500px;
    height: 300px;
    border: 1px solid red;
  }`]
})
export class PictureComponent {


  @ViewChild('canvas', {static: false})
  private canvas: ElementRef<HTMLCanvasElement>;

  x1 = -2;
  y1 = -1;
  x2 = 1;
  y2 = 1;


  constructor(private math: MathService) {
    setTimeout(() => this.draw(), 0);
  }

  canvasToWorld(canvasX: number, canvasY: number) {
    const canvas = this.canvas.nativeElement;
    return [
      canvasX * (this.x2 - this.x1) / canvas.width + this.x1,
      canvasY * (this.y2 - this.y1) / canvas.height + this.y1 ];
  }

  recalcSize(ex: number, ey: number) {
    const canvas = this.canvas.nativeElement;
    const [x, y] = this.canvasToWorld(ex - canvas.offsetLeft, ey - canvas.offsetTop);
    const xSize = (this.x2 - this.x1) / K;
    const ySize = (this.y2 - this.y1) / K;
    this.x1 = x - xSize / 2;
    this.x2 = x + xSize / 2;
    this.y1 = y - ySize / 2;
    this.y2 = y + ySize / 2;
  }

  draw() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height );
    const low = this.minIter(canvas);
    for (let x = 0; x < canvas.width; x += D) {
      for (let y = 0; y < canvas.height; y += D) {
        const [wx, wy] = this.canvasToWorld(x, y);
        const count = this.math.countIter2(wx, wy);
        if (count < this.math.iterLimit) {
          ctx.fillStyle = 'white'; // getColor(count, low);
          ctx.fillRect(x, y, D, D);
        }
      }
    }
  }

  // приблизительное определение наименьшей глубины итерации в изображении
  minIter(canvas: HTMLCanvasElement) {
    let res = Number.MAX_VALUE;
    const d = D * 50;
    for (let x = 0; x < canvas.width; x += d) {
      for (let y = 0; y < canvas.height; y += d) {
        const [wx, wy] = this.canvasToWorld(x, y);
        const count = this.math.countIter2(wx, wy);
        if (count < res) {
          res = count;
        }
      }
    }
    return res;
  }


  onMouseDown(e: MouseEvent) {
    this.recalcSize(e.clientX, e.clientY);
    this.draw();

  }
}