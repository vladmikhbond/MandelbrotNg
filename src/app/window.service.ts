import { Injectable } from '@angular/core';

const K = 2;      // scale change for one step

@Injectable({
  providedIn: 'root'
})
export class WindowService {


  public get scale() {
    return 2 ** this.history.length;
  }

  x1 = -2;
  y1 = -1;
  x2 = 1;
  y2 = 1;
  iterLimit = 20;
  canvas: HTMLCanvasElement;

  history: number[][] = [];


  // Zn = Zn**2 + C;
  // Zo = 0; C = {x, y}
  countIter(cx, cy, limit = this.iterLimit) {
    let x = cx;
    let y = cy;
    for (let i = 0; i < limit; i++) {
      [x, y] = [x * x - y * y + cx, 2 * x * y + cy];
      if ((x * x) + (y * y) > 4) {
        return i;
      }
    }
    return limit;
  }

  canvasToWorld(canX: number, canY: number) {
    return [
      canX * (this.x2 - this.x1) / this.canvas.width + this.x1,
      canY * (this.y2 - this.y1) / this.canvas.height + this.y1 ];
  }

  // set point (ex, ey) to the center of the new window
  //
  magnify(ex: number, ey: number) {
    this.historyForth();
    const [x, y] = this.canvasToWorld(ex - this.canvas.offsetLeft, ey - this.canvas.offsetTop);
    const xSize = (this.x2 - this.x1) / K;
    const ySize = (this.y2 - this.y1) / K;
    this.x1 = x - xSize / 2;
    this.x2 = x + xSize / 2;
    this.y1 = y - ySize / 2;
    this.y2 = y + ySize / 2;
  }

  historyForth() {
    this.history.push([this.x1, this.y1, this.x2, this.y2, this.iterLimit]);
  }
  historyBack() {
    if (this.history.length > 0) {
      [this.x1, this.y1, this.x2, this.y2, this.iterLimit] = this.history.pop();
    }
  }

  // приблизительное определение наименьшей глубины итерации в изображении
  // minIter(canvas: HTMLCanvasElement) {
  //   let res = Number.MAX_VALUE;
  //   const d = 50;
  //   for (let x = 0; x < canvas.width; x += d) {
  //     for (let y = 0; y < canvas.height; y += d) {
  //       const [wx, wy] = this.canvasToWorld(x, y);
  //       const count = this.countIter(wx, wy);
  //       if (count < res) {
  //         res = count;
  //       }
  //     }
  //   }
  //   return res;
  // }
}
