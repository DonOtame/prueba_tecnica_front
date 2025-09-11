import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSonnerToaster } from 'ngx-sonner';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, LanguageSwitcherComponent, ThemeSwitcherComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('prueba_tecnica_front');
  ngOnInit(): void {
    initFlowbite();
  }
}
