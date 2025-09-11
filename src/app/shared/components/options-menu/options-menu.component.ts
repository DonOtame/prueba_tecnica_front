import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface MenuOption {
  label: string;
  action: () => void;
}

@Component({
  selector: 'options-menu',
  imports: [TranslateModule],
  templateUrl: './options-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMenuComponent {
  public options = input<MenuOption[]>();
  public open = input<boolean | null>(null);
  public toggle = output<void>();
  public menuOpen = signal<boolean>(false);

  toggleMenu() {
    if (this.open() !== null) {
      this.toggle.emit();
    } else {
      this.menuOpen.set(!this.menuOpen());
    }
  }

  selectOption(option: MenuOption) {
    option.action();
    if (this.open() === null) {
      this.menuOpen.set(false);
    } else {
      this.toggle.emit();
    }
  }
}
