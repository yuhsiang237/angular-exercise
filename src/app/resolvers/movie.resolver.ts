// 匯入 Angular 的 Injectable 裝飾器，用來註冊服務
import { Injectable } from '@angular/core';

// 匯入 Resolve 介面，這是讓這個類別成為路由 Resolver 的關鍵
import { Resolve } from '@angular/router';

// 匯入 Observable，用來表示非同步資料（例如 API 回傳）
import { Observable } from 'rxjs';

// 匯入自訂的電影資料服務
import { MovieService } from '../services/movie.service';

// 使用 @Injectable 裝飾器，讓 Angular 知道這是個可以注入的服務
// providedIn: 'root' 表示它會被註冊為全域單例服務
@Injectable({ providedIn: 'root' })

// 宣告 MovieResolver 類別，實作 Resolve<string[]> 介面
// 也就是這個 Resolver 會回傳一個 string[] 的資料
export class MovieResolver implements Resolve<string[]> {
  // 建構子注入 MovieService，讓我們可以使用它來取得電影資料
  constructor(private movieService: MovieService) {}

  // resolve 方法是必要的，Angular 會在路由進入前自動呼叫它
  // 回傳一個 Observable<string[]>（非同步電影清單）
  resolve(): Observable<string[]> {
    return this.movieService.getMovies(); // 呼叫服務的方法取得資料
  }
}
