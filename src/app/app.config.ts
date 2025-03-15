import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule,provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

import { InterceptorService } from '../servicosHTTP/interceptor/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch(),withInterceptorsFromDi()), {
    provide: HTTP_INTERCEPTORS,  
    useClass: InterceptorService, 
    multi: true  
  }]
};
