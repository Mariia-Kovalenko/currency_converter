import { Action } from "@ngrx/store";
import { indexes } from "../utils/constants";
import * as CurrencyActions from "./currencies.actions";

export const initialState ={
    currencies: indexes
}

export function currenciesReducer(state = initialState, action: CurrencyActions.SetCurrencies) {
    switch (action.type) {
        case CurrencyActions.SET_CURRENCIES:
            return {
                currencies: [...action.payload]
            }
        default: 
            return state
    }
}