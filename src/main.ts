import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import 'eva-icons';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

registerLocaleData(localePt);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      NbThemeModule.forRoot({ name: 'tasktrack-light' }),
      NbDatepickerModule.forRoot(),
      NbDateFnsDateModule,
      NbDialogModule.forRoot(),
      NbIconModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbToastrModule.forRoot(),
    ),
  ],
}).catch((err) => console.error(err));
