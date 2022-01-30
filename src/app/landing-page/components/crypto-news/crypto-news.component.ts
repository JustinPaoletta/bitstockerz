import { Component, OnDestroy, OnInit } from '@angular/core';
import { CryptoNewsService } from './crypto-news.service';
import { Subscription } from 'rxjs';
import { NewsArticle } from '../../../types/types';

@Component({
  selector: 'app-crypto-news',
  templateUrl: './crypto-news.component.html',
  styleUrls: ['./crypto-news.component.scss'],
})
export class CryptoNewsComponent implements OnInit, OnDestroy {
  cryptoNewsArticles: NewsArticle[] = [];
  cryptoNewsSub$: Subscription = new Subscription();

  constructor(private cryptoNews: CryptoNewsService) {}

  ngOnInit(): void {
    this.cryptoNewsSub$ = this.cryptoNews
      .getCryptoNews()
      .subscribe((news: NewsArticle[]) => {
        news.forEach((article: NewsArticle) => {
          article.created_at = new Date(
            Date.parse(article.created_at)
          ).toLocaleTimeString();
        });
        this.cryptoNewsArticles = news;
      });
  }

  ngOnDestroy(): void {
    this.cryptoNewsSub$.unsubscribe();
  }
}
