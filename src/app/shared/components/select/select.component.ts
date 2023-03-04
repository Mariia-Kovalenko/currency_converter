import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

type SelectItem = {
  id: number;
  value: string;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  selectedItemIndex: number = 0;
  showDropdown = false;

  @Input() item!: number | undefined;
  @Input() items!: SelectItem[];

  @Output() itemSelected = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.selectedItemIndex = this.items.findIndex(
      item => item.id === this.item
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedItemIndex = this.items.findIndex(
      item => item.id === changes['item'].currentValue
    );
  }

  onClick() {
    this.showDropdown = !this.showDropdown;
  }

  onChangeSelectedValue(id: number) {
    console.log(id);

    this.showDropdown = false;
    this.selectedItemIndex = this.items.findIndex(item => item.id === id);
    this.itemSelected.emit(id);
  }

  //   onChange(event: any) {
  //   this.selectedItemIndex = +event.target.options[event.target.options.selectedIndex].value;
  //   this.itemSelected.emit(this.selectedItemIndex);
  // }
}
