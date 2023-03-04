import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiServiceService, ServerResponseData } from './core/services/api-service.service';
import { Currency, CurrencyCodes } from './shared/models/currency.model';
import { CURR_IDS, UAH_RATE } from './utils/constants';

import * as CurrencyActions from './store/currencies.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'currency_converter';

  lastUpdated: string = '';
  rates: Currency[] = [];

  constructor(
    private apiService: ApiServiceService,
    private store: Store<{ 
      currencies: { 
        currencies: Currency[] 
      } 
    }>
  ) {}

  ngOnInit() {
    this.apiService.fetchCurrencyRates(
      [ CurrencyCodes.EUR, CurrencyCodes.USD ], 
      CurrencyCodes.UAH)
      .subscribe({
        next: (data: ServerResponseData) => {
          // get info on last updated date
          this.lastUpdated = data.meta.last_updated_at;
          
          // currency rates
          const rates = Object.values(data.data)
            .map(({ code, value }: { code: CurrencyCodes, value: number }) => {
              const id = CURR_IDS.find((curr) => curr.code === code)
              return { id: id.id, code, coef: value}
            })
          this.rates = [...rates];

          rates.push(UAH_RATE);

          // dispatch action to set the store
          this.store.dispatch(new CurrencyActions.SetCurrencies(rates));
        },
        error: (error) => {
          console.log(error);
          
        }
      })
  }
}
