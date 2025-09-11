import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@app/core/services';

@Component({
  selector: 'language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private language = inject(LanguageService);

  public readonly currentLang = this.language.currentLang;
  public readonly availableLangs = this.language.availableLangs;

  public onLanguageChange(lang: string | null) {
    this.language.changeLanguage(lang);
  }
}
