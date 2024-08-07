import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { SearchInputComponent } from './pages/search-input/search-input.component';
import { WeatherForecastComponent } from './pages/weather-forecast/weather-forecast.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    SearchPage,
    WeatherDetailsComponent,
    SearchInputComponent,
    WeatherForecastComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule,
  ],
})
export class WeatherModule {}
