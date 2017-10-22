import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class NewsModel {
  datetime:	string;
  headline:	string;
  source:	  string;
  url:	    string;
  summary:	string;
  related:	string;

  constructor(datetime: string,
              headline: string,
              source:   string,
              url:      string,
              summary:  string,
              related:  string) {
    this.datetime = datetime;
    this.headline = headline;
    this.source   = source;
    this.url      = url;
    this.summary  = summary;
    this.related  = related;
  }
}
