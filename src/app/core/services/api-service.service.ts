import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/utils/endpoints';
import { CurrencyCodes } from 'src/app/shared/models/currency.model';
import { environment } from 'src/environments/environment';

export type ServerResponseData = {
  meta: {
    last_updated_at: string;
  };
  data: Object;
};

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  fetchCurrencyRates(currencies: CurrencyCodes[], baseCurrency: CurrencyCodes) {
    return this.http.get<ServerResponseData>(
      API_URL +
        `apikey=${environment.API_KEY}` +
        `&currencies=${currencies.join('%2C')}` +
        `&base_currency=${baseCurrency}`
    );
  }
}
