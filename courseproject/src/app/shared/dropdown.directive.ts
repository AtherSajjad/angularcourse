import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean;
  constructor() {}

  @HostListener('click') dropDownClicked() {
    this.isOpen = !this.isOpen;
  }
}
