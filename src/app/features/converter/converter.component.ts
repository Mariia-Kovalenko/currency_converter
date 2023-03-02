import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencyOptions = [
    { id: 1, value: 'UAH' },
    { id: 2, value: 'EUR' },
    { id: 3, value: 'USD' }
  ];

  baseCurrency: number | undefined = this.currencyOptions[0].id;
  targetCurrency: number | undefined = this.currencyOptions[1].id;

  constructor() { }

  ngOnInit(): void {
    console.log(this.baseCurrency, this.targetCurrency);
  }

  onBaseCurrencySelected(event: number) {
    const currencySelected = this.currencyOptions.find((currency) => currency.id === event);
    this.baseCurrency = currencySelected?.id;
    console.log('base currency selected', currencySelected);
  }

  onTargetCurrencySelected(event: number) {
    const currencySelected = this.currencyOptions.find((currency) => currency.id === event);
    this.targetCurrency = currencySelected?.id;
    console.log('target currency selected', currencySelected);
  }

  onExchangeToggle(event: string) {
    console.log(event);
    [this.baseCurrency, this.targetCurrency] = [this.targetCurrency, this.baseCurrency];

    console.log(this.baseCurrency, this.targetCurrency);
    
  }

}
