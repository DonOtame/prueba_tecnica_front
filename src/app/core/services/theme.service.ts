import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDark();
    }
  }

  isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  toggleTheme() {
    if (this.isDark()) {
      this.disableDark();
    } else {
      this.enableDark();
    }
  }

  private enableDark() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  private disableDark() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
