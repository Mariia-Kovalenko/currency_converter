import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/utils/endpoints';
import { CurrencyCodes } from 'src/app/shared/models/currency.model';

export type ServerResponseData = {
  meta: Object, 
  data: Object
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  fetchCurrencyRates() {
    return this.http.get<ServerResponseData>( 
      API_URL + `apikey=${process.env['API_KEY']}&currencies=${CurrencyCodes.EUR}%2C${CurrencyCodes.USD}&base_currency=${CurrencyCodes.UAH}`
    )
  }
}
