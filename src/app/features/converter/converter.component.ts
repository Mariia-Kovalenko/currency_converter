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

  baseCurrencyCode: string | undefined = this.currencyOptions[0].value;
  targetCurrencyCode: string | undefined = this.currencyOptions[1].value;

  targetCurrencyCoef: number = 0.02;

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
        next: (val) => {
          this.baseValue = val.baseCurrencyValue;
          const { amount, coef } = this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue);
          
          this.targetValue = amount;
          this.targetCurrencyCoef = coef;
        },
        error: (err) => {
          console.log(err);
        }
      })

    this.targetCurrencyInput.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (val) => {
          this.targetValue = val.targetCurrencyValue;
          
          const { amount, coef } = this.convertionService.convert(this.targetCurrency, this.baseCurrency, this.targetValue);

          this.baseValue = amount;
          this.targetCurrencyCoef = coef;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onBaseCurrencySelected(event: number) {
    const currencySelected = this.currencyOptions.find((currency) => currency.id === event);
    this.baseCurrency = currencySelected?.id;
    this.baseCurrencyCode = currencySelected?.value;

    // recalculate
    const { amount, coef } = this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue)
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }

  onTargetCurrencySelected(event: number) {
    const currencySelected = this.currencyOptions.find((currency) => currency.id === event);
    this.targetCurrency = currencySelected?.id;
    this.targetCurrencyCode = currencySelected?.value;

    // recalculate
    const { amount, coef } = this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue);
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }

  onExchangeToggle() {
    [this.baseCurrency, this.targetCurrency] = [this.targetCurrency, this.baseCurrency];
    [this.baseCurrencyCode, this.targetCurrencyCode] = [this.targetCurrencyCode, this.baseCurrencyCode];
    // recalculate target currency amount
    const { amount, coef } = this.convertionService.convert(this.baseCurrency, this.targetCurrency, this.baseValue);
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }
}
