import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  searchControl = new FormControl();
  filteredOptions: Observable<Location[]> = of([]);

  @Output() citySelected = new EventEmitter<Location>();

  constructor(private locationService: LocationService) {
    this.subscribeInputChange();
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = this.sanitizeInputForEnglishLetters(input.value);
    if (sanitizedValue !== input.value) {
      this.searchControl.setValue(sanitizedValue, { emitEvent: false });
    }
  }

  subscribeInputChange(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return value.length > 2
          ? this.locationService.getAutocompleteLocation(value).pipe(
            catchError(() => {
              return of([]);
            })
          )
          : of([]);
      })
    );
  }
  sanitizeInputForEnglishLetters(value: string): string {
    return value.replace(/[^a-zA-Z\s]/g, '');
  }

  selectCity(city: Location): void {
    this.searchControl.setValue(city.LocalizedName, { emitEvent: false });
    this.citySelected.emit(city);
  }
}
