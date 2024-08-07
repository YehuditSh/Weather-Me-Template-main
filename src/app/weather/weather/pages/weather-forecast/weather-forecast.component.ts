import { Component, Input } from '@angular/core';
import { Forecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent {
  @Input() forecast: Forecast | null = null;
  displayedColumns: string[] = ['date', 'temperature', 'iconPhrase', 'dayIconPhrase', 'nightIconPhrase'];
}
