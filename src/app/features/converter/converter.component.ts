import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConvertionService } from 'src/app/core/services/convertion.service';
import { Currency } from 'src/app/shared/models/currency.model';
import { indexes, UAH_ID } from 'src/app/utils/constants';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input('lastUpdated') lastUpdated: string;
  
  currencyOptions = [];

  baseCurrencyId: number | undefined = 1;
  targetCurrencyId: number | undefined = 1;

  baseCurrencyCode: string | undefined = '';
  targetCurrencyCode: string | undefined = '';

  targetCurrencyCoef: number = 0.02;

  baseValue!: number;
  targetValue!: number;

  baseCurrencyInput!: FormGroup;
  targetCurrencyInput!: FormGroup;

  constructor(
    private convertionService: ConvertionService,
    private store: Store<{ currencies: { currencies: Currency[] } }>
  ) { }

  ngOnInit(): void {
    this.store.select('currencies').subscribe({
      next: data => {
        // console.log(data);
        
        this.currencyOptions = data.currencies
          .map((curr) => { 
            return { id: curr.id, value: curr.code, coef: curr.coef }
          })
          
        this.baseCurrencyId = data.currencies[2].id;
        this.targetCurrencyId = data.currencies[1].id;

        this.baseCurrencyCode = data.currencies[2].code;
        this.targetCurrencyCode = data.currencies[1].code;
      },
      error: err => {
        console.log(err);
      }
    })
    
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
          const { amount, coef } = this.convertionService
            .convert(
              this.baseCurrencyId, 
              this.targetCurrencyId, 
              this.baseValue,
              this.currencyOptions
            );
          
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
          
          const { amount, coef } = this.convertionService.convert(
            this.targetCurrencyId, 
            this.baseCurrencyId, 
            this.targetValue,
            this.currencyOptions
          );

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
    this.baseCurrencyId = currencySelected?.id;
    this.baseCurrencyCode = currencySelected?.value;

    // recalculate
    const { amount, coef } = this.convertionService.convert(
      this.baseCurrencyId, 
      this.targetCurrencyId, 
      this.baseValue,
      this.currencyOptions
    );
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }

  onTargetCurrencySelected(event: number) {
    const currencySelected = this.currencyOptions.find((currency) => currency.id === event);
    this.targetCurrencyId = currencySelected?.id;
    this.targetCurrencyCode = currencySelected?.value;

    // recalculate
    const { amount, coef } = this.convertionService.convert(
      this.baseCurrencyId, 
      this.targetCurrencyId, 
      this.baseValue,
      this.currencyOptions
    );
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }

  onExchangeToggle() {
    [this.baseCurrencyId, this.targetCurrencyId] = [this.targetCurrencyId, this.baseCurrencyId];
    [this.baseCurrencyCode, this.targetCurrencyCode] = [this.targetCurrencyCode, this.baseCurrencyCode];
    // recalculate target currency amount
    const { amount, coef } = this.convertionService.convert(
      this.baseCurrencyId, 
      this.targetCurrencyId, 
      this.baseValue,
      this.currencyOptions
      );
    this.targetValue = amount;
    this.targetCurrencyCoef = coef;
  }
}
