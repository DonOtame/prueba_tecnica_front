import { computed, inject, Injectable, signal } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { getLanguageFlag } from '@app/shared/utils';

interface Language {
  lang: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private cookies = inject(CookieService);

  private langs = signal<readonly string[]>(this.translate.getLangs());

  public currentLang = signal<Language>(this.createLanguage(this.getInitialLang()));

  public availableLangs = computed<Language[]>(() => this.langs().map(this.createLanguage));

  private getInitialLang(): string {
    return this.cookies.get('lang') || this.translate.getBrowserLang() || 'es';
  }

  private createLanguage(lang: string): Language {
    return {
      lang,
      flag: getLanguageFlag(lang),
    };
  }

  public changeLanguage(lang: string | null): boolean {
    if (!lang) return false;
    this.translate.use(lang);
    this.currentLang.set(this.createLanguage(lang));
    this.cookies.set('lang', lang);
    return true;
  }
}
