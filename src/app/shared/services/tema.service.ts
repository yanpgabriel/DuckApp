import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";

const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

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
    this.switchTheme(`${this.getCurrentTheme().includes(DARK_THEME) ? LIGHT_THEME : DARK_THEME}`);
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
      this.applyColor(theme);
      localStorage.setItem('theme', theme);
    }
  }

  private applyColor(theme: string) {
    let meta = this.document.getElementById('theme-color') as HTMLMetaElement;
    if (theme === LIGHT_THEME) {
      meta.content = '#ffffff';
    } else {
      meta.content = '#000000'
    }
  }
}
