import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowService} from './window.service';

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



  constructor(private win: WindowService) {
    setTimeout(() => {
      win.canvas = this.canvas.nativeElement;
      this.draw();
    }, 0);
  }

  onMouseDown(e: MouseEvent) {
    this.win.magnify(e.clientX, e.clientY);
    this.draw();
  }


  draw() {
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
  }


}
