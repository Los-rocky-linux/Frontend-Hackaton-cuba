import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { TranslateService } from '@ngx-translate/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend-base-project';

  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map((v) => v[1])
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }
}
