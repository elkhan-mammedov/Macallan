import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StockQuoteModel {
  symbol:	string;
  companyName:	string;
  primaryExchange:	string;
  sector:	string;
  calculationPrice:	string;
  open:	string;
  openTime:	string;
  close:	string;
  closeTime:	string;
  latestPrice:	string;
  latestSource:	string;
  latestTime:	string;
  latestUpdate:	string;
  latestVolume:	string;
  iexRealtimePrice:	string;
  iexRealtimeSize:	string;
  iexLastUpdated:	string;
  delayedPrice:	string;
  delayedPriceTime:	string;
  previousClose:	string;
  change:	string;
  changePercent:	string;
  iexMarketPercent:	string;
  iexVolume:	string;
  avgTotalVolume:	string;
  iexBidPrice:	string;
  iexBidSize:	string;
  iexAskPrice:	string;
  iexAskSize:	string;
  marketCap:	string;
  peRatio:	string;
  week52High:	string;
  week52Low:	string;
  ytdChange:	string;
  imgUrl: string;

  constructor(symbol: string, companyName: string, primaryExchange: string,
              sector: string, calculationPrice: string, open: string,
              openTime: string, close: string, closeTime: string,
              latestPrice: string, latestSource: string, latestTime: string,
              latestUpdate: string, latestVolume: string,
              iexRealtimePrice: string, iexRealtimeSize: string,
              iexLastUpdated: string, delayedPrice: string,
              delayedPriceTime: string, previousClose: string,
              change: string, changePercent: string, iexMarketPercent: string,
              iexVolume: string, avgTotalVolume: string, iexBidPrice: string,
              iexBidSize: string, iexAskPrice: string, iexAskSize: string,
              marketCap: string, peRatio: string, week52High: string,
              week52Low: string, ytdChange: string) {
    this.symbol = symbol;
    this.companyName = companyName;
    this.primaryExchange = primaryExchange;
    this.sector = sector;
    this.calculationPrice = calculationPrice;
    this.open = open;
    this.openTime = openTime;
    this.close = close;
    this.closeTime = closeTime;
    this.latestPrice = latestPrice;
    this.latestSource = latestSource;
    this.latestTime = latestTime;
    this.latestUpdate = latestUpdate;
    this.latestVolume = latestVolume;
    this.iexRealtimePrice = iexRealtimePrice;
    this.iexRealtimeSize = iexRealtimeSize;
    this.iexLastUpdated = iexLastUpdated;
    this.delayedPrice = delayedPrice;
    this.delayedPriceTime = delayedPriceTime;
    this.previousClose = previousClose;
    this.change = change;
    this.changePercent = changePercent;
    this.iexMarketPercent = iexMarketPercent;
    this.iexVolume = iexVolume;
    this.avgTotalVolume = avgTotalVolume;
    this.iexBidPrice = iexBidPrice;
    this.iexBidSize = iexBidSize;
    this.iexAskPrice = iexAskPrice;
    this.iexAskSize = iexAskSize;
    this.marketCap = marketCap;
    this.peRatio = peRatio;
    this.week52High = week52High;
    this.week52Low = week52Low;
    this.ytdChange = ytdChange;
  }
}
