import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Currency } from 'src/app/shared/models/currency.model';
import { Store } from '@ngrx/store';
import { UAH_ID } from 'src/app/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  rates: Currency[];

  constructor(
    private store: Store<{ currencies: { currencies: Currency[] } }>
  ) {}

  ngOnInit(): void {
    this.store.select('currencies').subscribe({
      next: data => {
        this.rates = data.currencies.filter(curr => curr.id !== UAH_ID);
      },
      error: error => {
        console.error(error);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rates = changes['rates'].currentValue;
  }
}
