import { Injectable } from '@angular/core';

const K = 10;      // scale change for one step
const WIDTH = 510;
const HEIGHT = 340;
const INFINITY = 2000;

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  public get scale() {
    return K ** this.history.length;
  }

  x1: number;
  y1: number;
  x2: number;
  y2: number;
  iterLimit: number;
  canvas: HTMLCanvasElement;
  matrix: number[][];

  history: number[][];

  constructor() {
    this.init();
    //
    this.matrix = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
      this.matrix[i] = new Array(WIDTH);
    }
  }

  init() {
    this.x1 = -2;
    this.y1 = -1;
    this.x2 = 1;
    this.y2 = 1;
    this.iterLimit = 20;
    this.history = [];
  }

  fillMatrix() {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        const [wx, wy] = this.canvasToWorld(x, y);
        this.matrix[y][x] = this.countIter(wx, wy, INFINITY);
      }
    }
  }

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
    //
    this.fillMatrix();
  }

  minify() {
    this.historyBack();
    this.fillMatrix();
  }

  private historyForth() {
    this.history.push([this.x1, this.y1, this.x2, this.y2, this.iterLimit]);
  }

  private historyBack() {
    if (this.history.length > 0) {
      [this.x1, this.y1, this.x2, this.y2, this.iterLimit] = this.history.pop();
    }
  }

  // приблизительное определение наименьшей глубины итерации в изображении
  minIter(canvas: HTMLCanvasElement) {
    let res = Number.MAX_VALUE;
    const d = 50;
    for (let x = 0; x < canvas.width; x += d) {
      for (let y = 0; y < canvas.height; y += d) {
        const count = this.matrix[y][x];
        if (count < res) {
          res = count;
        }
      }
    }
    return res;
  }
}
