import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Currency } from 'src/app/shared/models/currency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('rates') rates: Currency[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rates = changes['rates'].currentValue;
  }

}
