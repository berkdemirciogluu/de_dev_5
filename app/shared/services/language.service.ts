import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService) {}

  setLanguage(code: string) {
    this.translateService.use(code);
    localStorage.setItem('language', code);
  }

  get selectedLanguage(): string {
    // console.log(this.localStorage.get('language'));
    return (
      localStorage.getItem('language') || this.translateService.defaultLang
    );
  }
}
