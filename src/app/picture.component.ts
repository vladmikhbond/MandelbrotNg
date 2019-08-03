import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowService} from './window.service';

const D = 1;     // canvas pixel

@Component({
  selector: 'app-picture',
  template: `
    <canvas #canvas width="500" height="300"
            (mousedown)="onMouseDown($event)"
            (keypress)="onKeyPress($event)" tabindex="1">
    </canvas>
  `,
  styles: [
    `canvas {
    width: 500px;
    height: 300px;
    border: thin solid gray;
  }`]
})
export class PictureComponent {


  @ViewChild('canvas', {static: true})
  private canvas: ElementRef<HTMLCanvasElement>;
  elapsedTime = '';
  colorSchema = {schemaNo: 0, dark: 'black', light: 'white', third: 'white'};

  constructor(private win: WindowService) {
    setTimeout(() => {
      win.canvas = this.canvas.nativeElement;
      this.draw();
    }, 0);
  }

  //////////////// event handlers ///////////////////////
  onMouseDown(e: MouseEvent) {
    this.win.magnify(e.clientX, e.clientY);
    this.draw();
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.code === 'KeyZ' && e.ctrlKey) {
      this.win.historyBack();
      this.draw();
    }
  }

  draw() {
    const t = new Date();

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.getInfitityColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height );

    const low = this.win.minIter(canvas);
    for (let x = 0; x < canvas.width; x += D) {
      for (let y = 0; y < canvas.height; y += D) {
        const [wx, wy] = this.win.canvasToWorld(x, y);
        const count = this.win.countIter(wx, wy);
        if (count < this.win.iterLimit) {
          ctx.fillStyle = this.getColor(count, low);
          ctx.fillRect(x, y, D, D);
        }
      }
    }
    this.elapsedTime = (new Date().valueOf() - t.valueOf()) + ' ms';
    setTimeout(() => {this.elapsedTime = ''; }, 5000);
  }


  private getInfitityColor() {
    switch (this.colorSchema.schemaNo) {
      case 0: case 1: case 2: case 3:
        return this.colorSchema.dark;
    }
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
        return `rgb(${r}, ${g}, ${b})`;

    }
  }
}

