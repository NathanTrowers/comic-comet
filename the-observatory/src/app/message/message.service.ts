import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  cssClass: string = '';
  message: string = '';

  constructor() {}

  setMessage(cssClass: string, message: string): void {
    this.cssClass = cssClass;
    this.message = message;
  }

  close(): void {
    this.message = '';
    this.cssClass = '';
  }
}
