import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { currenciesReducer } from './store/currencies.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FeaturesModule,
    SharedModule,
    StoreModule.forRoot({ currencies: currenciesReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
