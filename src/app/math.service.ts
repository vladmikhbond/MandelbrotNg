import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MathService {

  public iterLimit = 1000;

  constructor() { }

  // Zn = Zn**2 + C;
  // Zo = 0; C = {x, y}
  countIter2(cx, cy, limit = this.iterLimit) {
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



}
