import { CurrencyCodes } from '../shared/models/currency.model';

export const UAH_ID = 1;
export const EUR_ID = 2;
export const USD_ID = 3;

export const UAH_RATE = {
  id: UAH_ID,
  code: CurrencyCodes.UAH,
  coef: 1,
};

export const CURR_IDS = [
  {
    id: UAH_ID,
    code: CurrencyCodes.UAH,
  },
  {
    id: EUR_ID,
    code: CurrencyCodes.EUR,
  },
  {
    id: USD_ID,
    code: CurrencyCodes.USD,
  },
];

// UAH to currencies coefs
export const indexes = [
  {
    id: UAH_ID,
    code: CurrencyCodes.UAH,
    coef: 1,
  },
  {
    id: EUR_ID,
    code: CurrencyCodes.EUR,
    coef: 0.0,
  },
  {
    id: USD_ID,
    code: CurrencyCodes.USD,
    coef: 0.0,
  },
];
