import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';

class NewsModel {
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

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsCtrl: FormControl;
  filteredNews: Observable<any[]>;

  private apiUrl = 'https://api.iextrading.com/1.0/stock/market/news/last/25';
  latestNews: NewsModel[] = [];

  constructor(private http: Http) {
    this.getLatestNews();
    this.newsCtrl = new FormControl();
    this.filteredNews = this.newsCtrl.valueChanges
      .startWith(null)
      .map(n => n ? this.filterNews(n) : this.latestNews.slice());
  }

  filterNews(title: string) {
    return this.latestNews.filter(n =>
      n.headline.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) === 0);
  }

  private getData() {
    this.http.get(this.apiUrl).subscribe(data => {
      for (const n of data.json()) {
        const nm: NewsModel = n;
        console.log(nm);
        this.latestNews.push(nm);
      }
    });
  }

  private getLatestNews() {
     this.getData();
  }

  ngOnInit() {
  }
}
