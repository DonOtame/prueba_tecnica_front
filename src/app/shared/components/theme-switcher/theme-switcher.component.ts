import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '@app/core/services';

@Component({
  selector: 'theme-switcher',
  imports: [],
  template: `
    <button
      (click)="themeService.toggleTheme()"
      class="shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      type="button"
    >
      <span class="me-2">{{ themeService.isDark() ? '🌙' : '☀️' }}</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  public themeService = inject(ThemeService);
}
