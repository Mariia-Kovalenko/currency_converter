export enum CurrencyCodes {
  UAH = 'UAH',
  EUR = 'EUR',
  USD = 'USD',
}

export interface Currency {
  id: number;
  code: CurrencyCodes;
  coef: number;
}
