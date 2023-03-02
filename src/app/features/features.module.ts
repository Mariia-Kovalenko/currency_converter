import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { SelectComponent } from '../shared/select/select.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConverterComponent
  ]
})
export class FeaturesModule { }
