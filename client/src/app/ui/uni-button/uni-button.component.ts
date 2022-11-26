import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-uni-button',
  templateUrl: './uni-button.component.html',
  styleUrls: ['./uni-button.component.scss'],
})
export class UniButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() color: ThemePalette = 'primary';

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClicked($event: MouseEvent): void {
    $event.stopPropagation();

    if (!this.isDisabled) {
      this.click.emit();
    }
  }
}
