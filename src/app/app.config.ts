import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule,provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

import { InterceptorService } from '../servicosHTTP/interceptor/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(),provideHttpClient(withFetch()),InterceptorService]
};
