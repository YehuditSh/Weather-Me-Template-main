import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Location } from 'src/app/shared/models/location.model';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { WeatherService } from "../../../../core/services/weather.service";

@Component({
  selector: 'weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnChanges {
  @Input() weather: CurrentWeather | null = null;
  @Input() location: Location | null = null;
  isFavorite: boolean = false;
  isMetric: boolean = true;
  constructor(private favoritesService: FavoritesService,
              private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscribeTemperatureUnitChanged();
    this.updateFavoriteStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !changes['location'].isFirstChange()) {
      this.updateFavoriteStatus();
    }
  }

  subscribeTemperatureUnitChanged(): void {
    this.weatherService.temperatureUnitChanged.subscribe(() => {
      this.isMetric = this.weatherService.isMetric;
    });
  }

  toggleFavorite(): void {
    if (this.location) {
      if (this.isFavorite) {
        this.favoritesService.removeFromFavorites(this.location.Key);
      } else {
        this.favoritesService.addToFavorites(this.location);
      }
      this.isFavorite = !this.isFavorite;
    }
  }

  checkIfFavorite(locationKey: string): boolean {
    const favorites = this.favoritesService.getFavorites();
    return favorites.some(favorite => favorite.Key === locationKey);
  }

  private updateFavoriteStatus(): void {
    if (this.location) {
      this.isFavorite = this.checkIfFavorite(this.location.Key);
    }
  }
}
