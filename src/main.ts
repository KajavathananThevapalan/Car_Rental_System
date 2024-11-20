import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));





  // export const appConfig: ApplicationConfig = {
  //   providers: [provideHttpClient()],
  // };


  // export const appConfig: ApplicationConfig = {
  //   providers: [provideRouter(Router), provideHttpClient()],
  // };

  // [provideRouter(routes), 


  