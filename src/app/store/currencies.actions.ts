import { Action } from "@ngrx/store/src";
import { Currency } from "../shared/models/currency.model";

export const SET_CURRENCIES = 'SET_CURRENCIES';

export class SetCurrencies implements Action {
    readonly type = SET_CURRENCIES;
    payload: Currency[];
}