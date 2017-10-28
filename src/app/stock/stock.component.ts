import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';
import * as jQuery from 'jquery';
import {Http} from '@angular/http';
import {StockRefModel} from '../stock-summary-model/stock-summary-model.module';
import {StockQuoteModel} from '../stock-quote-model/stock-quote.module';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockCtrl: FormControl;
  filteredStocksSearchBar: Observable<any[]>;

  private refUrl = 'https://api.iextrading.com/1.0/ref-data/symbols';
  private stockQuote = 'https://api.iextrading.com/1.0/stock/';
  stocks: StockRefModel[] = [];
  filteredStocks: StockQuoteModel[] = [];

  constructor(private http: Http) {
    this.getCompanyList();
    this.stockCtrl = new FormControl();
    this.filteredStocksSearchBar = this.stockCtrl.valueChanges
      .startWith(null)
      .map(s => s ? this.filterStocks(s) : []);
  }

  filterStocks(title: string) {
    return this.stocks.filter(s =>
      s.name.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) === 0 ||
      s.symbol.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) === 0);
  }

  private getCompanyList() {
    this.http.get(this.refUrl).subscribe(data => {
      for (const s of data.json()) {
        const srm: StockRefModel = s;
        this.stocks.push(srm);
      }
    });
  }

  private search() {
    const searchQuery: string = jQuery('#search-bar').val() as string;
    this.filteredStocks = [];
    let i = 1;
    for ( const s of this.stocks ) {
      if (s.name.toLocaleLowerCase().indexOf(searchQuery.toLocaleLowerCase()) === 0 ||
        s.symbol.toLocaleLowerCase().indexOf(searchQuery.toLocaleLowerCase()) === 0) {
        this.getStockQuote(s.symbol);
        i += 1;
      }

      if (i === 25) {
        break;
      }
    }
    jQuery('#back-button').show();
  }

  private getStockQuote(symbol: string) {
    this.http.get(this.stockQuote + symbol + '/quote').subscribe(data => {
      const sqm: StockQuoteModel = data.json();
      this.getCompanyLogo(symbol, sqm);
      this.filteredStocks.push(sqm);
    });
  }

  private getCompanyLogo(symbol: string, sqm: StockQuoteModel) {
    this.http.get(this.stockQuote + symbol + '/logo').subscribe(data => {
      sqm.imgUrl = data.json()['url'];
    });
  }

  private back() {
    this.filteredStocks = [];
    jQuery('#back-button').hide();
  }

  ngOnInit() {
  }

}
