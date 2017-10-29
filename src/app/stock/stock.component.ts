import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';
import * as jQuery from 'jquery';
import {Http} from '@angular/http';
import {StockRefModel} from '../stock-summary-model/stock-summary-model.module';
import {StockQuoteModel} from '../stock-quote-model/stock-quote.module';
import {NewsModel} from '../news-model/news-model.module';

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
  mostActive: StockQuoteModel[] = [];
  gainers: StockQuoteModel[] = [];
  losers: StockQuoteModel[] = [];

  constructor(private http: Http) {
    this.getCompanyList();
    this.getTops();
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
    jQuery('#tops').hide();
  }

  private getStockQuote(symbol: string) {
    this.http.get(this.stockQuote + symbol + '/quote').subscribe(data => {
      const sqm: StockQuoteModel = data.json();
      this.getCompanyLogo(symbol, sqm);
      this.getRelatedNews(symbol, sqm);
      this.filteredStocks.push(sqm);
    });
  }

  private getCompanyLogo(symbol: string, sqm: StockQuoteModel) {
    this.http.get(this.stockQuote + symbol + '/logo').subscribe(data => {
      sqm.imgUrl = data.json()['url'];
    });
  }

  private getRelatedNews(symbol: string, sqm: StockQuoteModel) {
    this.http.get(this.stockQuote + symbol + '/news/last/3').subscribe(data => {
      const relatedNews: NewsModel[] = [];
      for (const n of data.json()) {
        const nm: NewsModel = n;
        relatedNews.push(nm);
      }
      sqm.relatedNews = relatedNews;
    });
  }

  private back() {
    this.filteredStocks = [];
    jQuery('#back-button').hide();
    jQuery('#tops').show();
  }

  ngOnInit() {
  }

  private getTops() {
    this.http.get('https://api.iextrading.com/1.0/stock/market/list/mostactive').subscribe(data => {
      for (const s of data.json()) {
        console.log('in tops');
        const ss: StockQuoteModel = s;
        this.mostActive.push(ss);
      }
    });

    this.http.get('https://api.iextrading.com/1.0/stock/market/list/gainers').subscribe(data => {
      for (const s of data.json()) {
        const ss: StockQuoteModel = s;
        this.gainers.push(ss);
      }
    });

    this.http.get('https://api.iextrading.com/1.0/stock/market/list/losers').subscribe(data => {
      for (const s of data.json()) {
        const ss: StockQuoteModel = s;
        this.losers.push(ss);
      }
    });
  }
}
