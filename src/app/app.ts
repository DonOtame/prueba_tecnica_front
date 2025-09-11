import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';
import { NgxSonnerToaster } from 'ngx-sonner';

import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageSwitcherComponent, NgxSonnerToaster],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('prueba_tecnica_front');
  ngOnInit(): void {
    initFlowbite();
  }
}
