import { Injectable } from '@angular/core';
import { 
  EUR_ID,  
  indexes,  
  UAH_ID, 
  USD_ID 
} from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class ConvertionService {

  constructor() { }

  convert(baseCurrencyId: number | undefined, targetCurrencyId: number | undefined, amount: number): {amount: number, coef: number} {
    // if currencies are the same
    if (baseCurrencyId === targetCurrencyId) return { amount, coef: 1 };
    let coef = 0;

    const targetCurrencyCoef = indexes.find((index) => index.id === targetCurrencyId);
    const baseCurrencyCoef = indexes.find((index) => index.id === baseCurrencyId);

    if (targetCurrencyCoef && baseCurrencyCoef) {
      // if we are not converting from or into UAH
      if (baseCurrencyId !== UAH_ID && targetCurrencyId !== UAH_ID) {
        coef = targetCurrencyCoef.coef / baseCurrencyCoef.coef;
        return { 
          amount: +(amount * coef).toFixed(2), 
          coef: +coef.toFixed(2) 
        };
      }

      // if we are converting into UAH
      if (targetCurrencyId === UAH_ID) {
        coef = 1 / baseCurrencyCoef.coef;
        return { amount: +(amount * coef).toFixed(2), coef: +coef.toFixed(2) };
      } 

      // if we are converting from UAH
      return { 
        amount: +(amount * targetCurrencyCoef.coef).toFixed(2), 
        coef: +targetCurrencyCoef.coef.toFixed(2) 
      };
    }
    
    return { amount: 0, coef: 0 };
  }
}
