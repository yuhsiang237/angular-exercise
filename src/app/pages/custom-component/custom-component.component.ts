import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss']
})
export class CustomComponentComponent implements OnInit {
  constructor() {}
  decimalPlacesInput: number = 2; // 使用者輸入的暫存值
  decimalPlaces: number = 2;
  myDecimalValue: number = 100.333;
  applyDecimalPlaces() {
    this.decimalPlaces = this.decimalPlacesInput;
  }
  ngOnInit(): void {}
}
