import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  public language: boolean = false;

  public languages: any[] = [
    {
      language: 'Español',
      code: 'es',
      icon: 'ec',
    },
    {
      language: 'English',
      code: 'en',
      // type: 'US',
      icon: 'us',
    },
    // {
    //   language: 'Français',
    //   code: 'fr',
    //   icon: 'fr',
    // },
    // {
    //   language: 'Português',
    //   code: 'pt',
    //   type: 'BR',
    //   icon: 'pt',
    // },
  ];

  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    icon: 'ec',
  };

  constructor(
    public navServices: NavService,
    private translate: TranslateService
  ) {}
  //
  ngOnInit() {}

  changeLanguage(lang: { code: string }) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }
}
