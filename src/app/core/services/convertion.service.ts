import { Injectable } from '@angular/core';
import { 
  EUR_CODE, 
  EUR_ID, 
  UAH_CODE, 
  UAH_ID, 
  USD_CODE, 
  USD_ID 
} from 'src/app/utils/constants';

// UAH to currencies coefs
const indexes = [
  {
    id: UAH_ID, curr: UAH_CODE, coef: 1
  },
  {
    id: EUR_ID, curr: EUR_CODE, coef: 0.025541
  },
  {
    id: USD_ID, curr: USD_CODE, coef: 0.027072
  }
]

@Injectable({
  providedIn: 'root'
})
export class ConvertionService {

  constructor() { }

  convert(baseCurrencyId: number | undefined, targetCurrencyId: number | undefined, amount: number) {
    // if currencies are the same
    if (baseCurrencyId === targetCurrencyId) return amount;

    const targetCurrencyCoef = indexes.find((index) => index.id === targetCurrencyId);
    const baseCurrencyCoef = indexes.find((index) => index.id === baseCurrencyId);

    if (targetCurrencyCoef && baseCurrencyCoef) {
      // if we are not converting from or into UAH
      if (baseCurrencyId !== UAH_ID && targetCurrencyId !== UAH_ID) {
        const coef = targetCurrencyCoef.coef / baseCurrencyCoef.coef;
        return (amount * coef).toFixed(2);
      }

      // if we are converting into UAH
      if (targetCurrencyId === UAH_ID) {
        return (amount * (1 / baseCurrencyCoef.coef)).toFixed(2);
      } 

      // if we are converting from UAH
      return (amount * targetCurrencyCoef.coef).toFixed(2);
    }
    
    return 0;
  }
}
