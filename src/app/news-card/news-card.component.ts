import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NewsModel} from '../news-model/news-model.module';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() nm: NewsModel;
  @HostBinding('attr.class') cssClass = 'row';

  constructor() {
  }

  ngOnInit() {
  }

}
