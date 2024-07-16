import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-lenguage',
  templateUrl: './select-lenguage.component.html',
  styleUrls: ['./select-lenguage.component.css']
})
export class SelectLenguageComponent {
  constructor(private translate: TranslateService) {}
  //Method for change the language of the site
  changeLanguage(lang: Event) {
    const selectedLanguage = (lang.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
  }
}
