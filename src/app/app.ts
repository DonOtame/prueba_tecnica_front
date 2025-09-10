import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('prueba_tecnica_front');
}
