import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConvertionService } from 'src/app/core/services/convertion.service';

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

  baseValue!: number;
  targetValue!: number;

  baseCurrencyInput!: FormGroup;
  targetCurrencyInput!: FormGroup;

  constructor(private convertionService: ConvertionService) { }

  ngOnInit(): void {
    this.baseCurrencyInput = new FormGroup({
      'baseCurrencyValue': new FormControl(''),
    });

    this.targetCurrencyInput = new FormGroup({
      'targetCurrencyValue': new FormControl(''),
    });

    this.baseCurrencyInput.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      )
      .subscribe({
        next: val => {
          console.log(val.baseCurrencyValue);
          this.baseValue = val.baseCurrencyValue;
          // this.targetValue = val.baseCurrencyValue * 0.025;

          this.targetValue = +this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue);
        },
        error: err => {
          console.log(err);
        }
      })

    this.targetCurrencyInput.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      )
      .subscribe({
        next: val => {
          console.log(val);
          this.targetValue = val.targetCurrencyValue;
          // this.baseValue = val.targetCurrencyValue * 39;

          this.baseValue = +this.convertionService.convert(this.targetCurrency, this.baseCurrency, this.targetValue);
        },
        error: err => {
          console.log(err);
        }
      })
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
    [this.baseCurrency, this.targetCurrency] = [this.targetCurrency, this.baseCurrency];
    console.log(`convert ${this.baseValue} ${this.baseCurrency} to ${this.targetValue} ${this.targetCurrency}`);

    // recalculate target currency amount
    this.targetValue = +this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue);
  }

  onBaseCurrencyChange(event: any) {
    console.log(event.target.value);
    this.targetCurrency = event.target.value *= 39;
  }

}
