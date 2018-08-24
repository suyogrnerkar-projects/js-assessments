import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppUrl: string = 'http://localhost:3000/';
  readonly baseAPIUrl: string = 'http://localhost:3001/';
}
