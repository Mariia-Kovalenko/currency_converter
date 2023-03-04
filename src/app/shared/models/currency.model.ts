export enum CurrencyCodes {
  UAH = 'UAH',
  EUR = 'EUR',
  USD = 'USD',
}

export type Currency = {
  id: number;
  code: CurrencyCodes;
  coef: number;
}
