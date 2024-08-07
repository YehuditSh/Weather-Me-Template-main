import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  displayLoading = false;
  isDarkTheme = false;

  constructor(private loaderService: LoaderService, private weatherService: WeatherService) {}

  ngOnInit() {
    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;
    this.weatherService.temperatureUnitChanged.next(null);
  }

  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
