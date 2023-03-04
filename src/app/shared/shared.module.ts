import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    SelectComponent,
    IconButtonComponent,
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectComponent,
    IconButtonComponent,
    LogoComponent
  ]
})
export class SharedModule { }
