import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StockRefModel {
  symbol:	string;
  name:	string;

  constructor(symbol: string,
              name: string) {
    this.symbol = symbol;
    this.name = name;
  }
}
