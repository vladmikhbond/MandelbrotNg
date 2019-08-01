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
  elapsedTime = 0.0;

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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height );
    // const low = this.win.minIter(canvas);
    for (let x = 0; x < canvas.width; x += D) {
      for (let y = 0; y < canvas.height; y += D) {
        const [wx, wy] = this.win.canvasToWorld(x, y);
        const count = this.win.countIter(wx, wy);
        if (count < this.win.iterLimit) {
          ctx.fillStyle = 'white'; // getColor(count, low);
          ctx.fillRect(x, y, D, D);
        }
      }
    }
    this.elapsedTime = new Date().valueOf() - t.valueOf();
  }


}
