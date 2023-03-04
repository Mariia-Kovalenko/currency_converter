import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() iconSrc: string = '';
  @Input() className: string = '';

  @Output() buttonClicked = new EventEmitter();

  constructor() {}

  onClick() {
    this.buttonClicked.emit();
  }
}
