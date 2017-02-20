import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'selected-value',
  templateUrl: 'app/selected-value/selected.value.html',
  styleUrls: ['app/selected-value/selected.value.css']
})
export class SelectedValueComponent
{
  @Input() value: string;
  @Input() tooltip: string;
  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>();

  resetValue(): void
  {
    this.value = '';
    this.reset.emit(true);
  }

  constructor() { }
  ngOnInit(){}
}