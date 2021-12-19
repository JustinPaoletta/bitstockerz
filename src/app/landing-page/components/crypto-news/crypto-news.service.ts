import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsArticle } from '../../../types/types';


@Injectable({
  providedIn: 'root'
})
export class CryptoNewsService {

  constructor(private http: HttpClient) { }

  getCryptoNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>('http://18.190.141.163/api/news');
  }
}
