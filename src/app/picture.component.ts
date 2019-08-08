import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowService, INFINITY} from './window.service';

const D = 1;     // canvas pixel

@Component({
  selector: 'app-picture',
  template: `
    <canvas #canvas width="510" height="340"
            (mousemove)="onMouseMove($event)"
            (mousedown)="onMouseDown($event)"
    ></canvas>
  `,
  styles: [
    `canvas {
    border: 2px solid #007bff;
      cursor:url(assets/frame-pointer.cur),crosshair;
  }`]
})
export class PictureComponent {


  @ViewChild('canvas', {static: true})
  private canvas: ElementRef<HTMLCanvasElement>;
  elapsedTime = '';
  colorSchema = {schemaNo: 0, dark: 'black', light: 'white', third: 'white'};
  heightInPoint = '';
  // smooth color scheme
  palette: string[] = new Array(INFINITY);

  constructor(private win: WindowService) {
    setTimeout(() => {
      win.canvas = this.canvas.nativeElement;
      this.win.fillMatrix();
      this.draw();
    }, 0);
  }

  //////////////// event handlers ///////////////////////
  onMouseDown(e: MouseEvent) {
    const t = new Date();

    this.win.magnify(e.clientX, e.clientY);
    this.draw();

    this.elapsedTime = (new Date().valueOf() - t.valueOf()) + ' ms';
    setTimeout(() => {
      this.elapsedTime = '';
    }, 2500);
  }

  draw() {
    // const t = new Date();

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.colorSchema.dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let low = 0;
    if (this.colorSchema.schemaNo === 3) {
      low = this.win.minIter(canvas);
      this.palettePrepare(low);
    }
    for (let x = 0; x < canvas.width; x += D) {
      for (let y = 0; y < canvas.height; y += D) {
        const height = this.win.matrix[y][x];
        if (height < this.win.iterLimit) {
          ctx.fillStyle = this.getColor(height, low);
          ctx.fillRect(x, y, D, D);
        }
      }
    }
    // console.log('Drawing Time = ' + (new Date().valueOf() - t.valueOf()) + ' ms');
  }


  private getColor(n: number, low: number = 0) {
    const fiery = ['red', 'vermilion', 'orange', 'amber', 'yellow',
      'chartreuse', 'green', 'teal', 'blue', 'violet', 'purple', 'magenta'];
    const zebra = [this.colorSchema.light, this.colorSchema.third];

    switch (this.colorSchema.schemaNo) {
      case 0:
        return this.colorSchema.light;
      case 1:
        const i = (n % fiery.length);
        return fiery[i];
      case 2:
        return zebra[n % 2];
      case 3:
        return this.palette[n];
    }
  }

  onMouseMove(e: MouseEvent) {
    const infinity = 10000;
    const canvas = this.canvas.nativeElement;
    const [wx, wy] = this.win.canvasToWorld(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    const n = this.win.countIter(wx, wy, infinity);
    this.heightInPoint = n === infinity ? '∞' : n.toString();

  }


  private palettePrepare(low: number) {
    for (let n = low - 1; n <= INFINITY; n++) {
      const k = (n - low) / (this.win.iterLimit - low);
      const r1 = parseInt((this.colorSchema.light.substr(1, 2)), 16);
      const g1 = parseInt((this.colorSchema.light.substr(3, 2)), 16);
      const b1 = parseInt((this.colorSchema.light.substr(5, 2)), 16);
      const r2 = parseInt((this.colorSchema.third.substr(1, 2)), 16);
      const g2 = parseInt((this.colorSchema.third.substr(3, 2)), 16);
      const b2 = parseInt((this.colorSchema.third.substr(5, 2)), 16);
      const r = Math.trunc(r1 * k + r2 * (1 - k));
      const g = Math.trunc(g1 * k + g2 * (1 - k));
      const b = Math.trunc(b1 * k + b2 * (1 - k));
      this.palette[n] = `rgb(${r}, ${g}, ${b})`;

    }
  }
}

