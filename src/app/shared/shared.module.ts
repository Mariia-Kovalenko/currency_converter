import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { IconButtonComponent } from './icon-button/icon-button.component';



@NgModule({
  declarations: [
    SelectComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectComponent,
    IconButtonComponent
  ]
})
export class SharedModule { }
