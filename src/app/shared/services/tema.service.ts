import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  initialTheme: string = 'dark';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.switchTheme(this.getCurrentTheme());
  }

  getCurrentTheme() {
    return localStorage.getItem('theme') || this.initialTheme;
  }

  toggleTheme() {
    this.switchTheme(`${this.getCurrentTheme().includes('dark') ? 'light' : 'dark'}`);
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
      localStorage.setItem('theme', theme);
    }
  }
}
