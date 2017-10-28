import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';
import {NewsModel} from '../news-model/news-model.module';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsCtrl: FormControl;
  filteredNewsSearchBar: Observable<any[]>;

  private apiUrl = 'https://api.iextrading.com/1.0/stock/market/news/last/25';
  latestNews: NewsModel[] = [];
  filteredLatestNews: NewsModel[] = [];

  constructor(private http: Http) {
    this.getLatestNews();
    this.newsCtrl = new FormControl();
    this.filteredNewsSearchBar = this.newsCtrl.valueChanges
      .startWith(null)
      .map(n => n ? this.filterNews(n) : []);
  }

  filterNews(title: string) {
    return this.latestNews.filter(n =>
      n.headline.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) === 0);
  }

  private getLatestNews() {
    this.http.get(this.apiUrl).subscribe(data => {
      for (const n of data.json()) {
        const nm: NewsModel = n;
        this.latestNews.push(nm);
      }
      this.filteredLatestNews = this.latestNews;
    });
  }

  private search() {
    const searchQuery: string = jQuery('#search-bar').val() as string;
    this.filteredLatestNews = [];
    for ( const nm of this.latestNews ) {
      if (nm.headline.toLocaleLowerCase().indexOf(searchQuery.toLocaleLowerCase()) === 0) {
        this.filteredLatestNews.push(nm);
      }
    }
    jQuery('#back-button').show();
  }

  private back() {
    this.filteredLatestNews = this.latestNews;
    jQuery('#back-button').hide();
  }

  ngOnInit() {
  }

}
