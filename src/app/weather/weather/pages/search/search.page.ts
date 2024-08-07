import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/shared/models/location.model';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { LocationService } from "../../../../core/services/location.service";
import { WeatherService } from "../../../../core/services/weather.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  weather: CurrentWeather | null = null;
  forecast: Forecast | null = null;
  defaultCityKey: string = '215854';
  currentLocation: Location | null = null;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscribeRouteChange();
    this.subscribeTemperatureUnitChanged();
  }

  subscribeRouteChange(): void {
    this.route.paramMap.subscribe(params => {
      const currentLocationKey = params.get('locationKey') || this.defaultCityKey;
      if (!this.currentLocation) {
        this.fetchLocationByKey(currentLocationKey);
      }
      this.fetchWeather(currentLocationKey);
      this.fetchForecast(currentLocationKey);
    });
  }

  subscribeTemperatureUnitChanged(): void {
    this.weatherService.temperatureUnitChanged.subscribe(() => {
      if(this.currentLocation) {
        this.fetchForecast(this.currentLocation.Key);
      }
    });
  }

  fetchLocationByKey(key: string): void {
    this.locationService.getLocationByKey(key).subscribe(
      location => {
        this.currentLocation = location;
      },
      error => {
        this.showError('Failed to load autocomplete results');
      }
    );
  }

  selectCity(city: Location): void {
    this.currentLocation = city;
    this.router.navigate(['/search', city.Key]);
  }

  fetchWeather(locationKey: string): void {
    this.weatherService.getCurrentWeather(locationKey).subscribe(
      data => {
        this.weather = data[0];
      },
      error => {
        this.showError('Failed to load current weather');
      }
    );
  }

  fetchForecast(locationKey: string): void {
    this.weatherService.getForecast(locationKey).subscribe(
      data => {
        this.forecast = data;
        },
      error => {
        this.showError('Failed to load weather forecast');
      });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
