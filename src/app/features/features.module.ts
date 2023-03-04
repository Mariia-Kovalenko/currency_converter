import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { SelectComponent } from '../shared/components/select/select.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConverterComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ConverterComponent],
})
export class FeaturesModule {}
