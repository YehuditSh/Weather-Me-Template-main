import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WeatherModule } from './weather/weather/weather.module';
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {LoaderService} from "./core/services/loader.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    WeatherModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
})
export class AppModule { }
