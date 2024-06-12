import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  globalVar: any = 'Your Value';

  constructor() { }
}
