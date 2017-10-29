import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {StockQuoteModel} from '../stock-quote-model/stock-quote.module';

@Component({
  selector: 'app-stock-summary-card',
  templateUrl: './stock-summary-card.component.html',
  styleUrls: ['./stock-summary-card.component.css']
})
export class StockSummaryCardComponent implements OnInit {
  @Input() ss: StockQuoteModel;
  @HostBinding('attr.class') cssClass = 'row';

  constructor() { }

  numberWithCommas(x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  ngOnInit() {
  }

}
