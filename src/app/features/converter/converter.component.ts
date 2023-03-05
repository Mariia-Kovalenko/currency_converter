import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConvertionService } from 'src/app/core/services/convertion.service';
import { Currency } from 'src/app/shared/models/currency.model';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  @Input() lastUpdated: string;

  currencyOptions = [];

  BASE = 'base';
  TARGET = 'target';

  baseCurrencyId: number | undefined = 1;
  targetCurrencyId: number | undefined = 1;

  baseCurrencyCode: string | undefined = '';
  targetCurrencyCode: string | undefined = '';

  targetCurrencyCoef: number = 0.0;

  baseValue!: number;
  targetValue!: number;

  baseCurrencyInput!: FormGroup;
  targetCurrencyInput!: FormGroup;

  constructor(
    private convertionService: ConvertionService,
    private store: Store<{ currencies: { currencies: Currency[] } }>
  ) {}

  ngOnInit(): void {
    this.store.select('currencies').subscribe({
      next: data => {
        this.currencyOptions = data.currencies.map(curr => {
          return { id: curr.id, value: curr.code, coef: curr.coef };
        });

        this.baseCurrencyId = data.currencies[2].id;
        this.targetCurrencyId = data.currencies[1].id;

        this.baseCurrencyCode = data.currencies[2].code;
        this.targetCurrencyCode = data.currencies[1].code;
        this.targetCurrencyCoef = +data.currencies[1].coef.toFixed(2);
      },
      error: err => {
        console.error(err);
      },
    });

    this.baseCurrencyInput = new FormGroup({
      baseCurrencyValue: new FormControl(''),
    });

    this.targetCurrencyInput = new FormGroup({
      targetCurrencyValue: new FormControl(''),
    });

    this.baseCurrencyInput.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe({
        next: val => {
          this.baseValue = val.baseCurrencyValue;
          this.convertCurrency();
        },
        error: err => {
          console.error(err);
        },
      });

    this.targetCurrencyInput.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe({
        next: val => {
          this.targetValue = val.targetCurrencyValue;
          const { amount, coef } = this.convertionService.convert(
            this.targetCurrencyId,
            this.baseCurrencyId,
            this.targetValue,
            this.currencyOptions
          );

          this.baseValue = amount;
          this.targetCurrencyCoef = coef;
        },
        error: err => {
          console.error(err);
        },
      });
  }

  convertCurrency() {
    const { amount, coef } = this.convertionService.convert(
      this.baseCurrencyId,
      this.targetCurrencyId,
      this.baseValue,
      this.currencyOptions
    );
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }

  onCurrencySelected(event: number, currency: string) {
    const currencySelected = this.currencyOptions.find(
      currency => currency.id === event
    );

    if (currency === this.BASE) {
      this.baseCurrencyId = currencySelected?.id;
      this.baseCurrencyCode = currencySelected?.value;
    }
    if (currency === this.TARGET) {
      this.targetCurrencyId = currencySelected?.id;
      this.targetCurrencyCode = currencySelected?.value;
    }

    // recalculate
    this.convertCurrency();
  }

  onExchangeToggle() {
    [this.baseCurrencyId, this.targetCurrencyId] = [
      this.targetCurrencyId,
      this.baseCurrencyId,
    ];
    [this.baseCurrencyCode, this.targetCurrencyCode] = [
      this.targetCurrencyCode,
      this.baseCurrencyCode,
    ];
    // recalculate target currency amount
    this.convertCurrency();
  }
}
