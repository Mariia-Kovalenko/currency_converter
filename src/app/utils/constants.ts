import { CurrencyCodes } from "../shared/models/currency.model";

export const UAH_ID = 1;
export const EUR_ID = 2;
export const USD_ID = 3;

// UAH to currencies coefs
export const indexes = [
    {
      id: UAH_ID, curr: CurrencyCodes.UAH, coef: 1
    },
    {
      id: EUR_ID, curr: CurrencyCodes.EUR, coef: 0.025541
    },
    {
      id: USD_ID, curr: CurrencyCodes.USD, coef: 0.027072
    }
  ]
