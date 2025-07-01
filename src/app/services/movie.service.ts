// 匯入 Angular 的 @Injectable 裝飾器，用來註冊服務
import { Injectable } from '@angular/core';

// 匯入 RxJS 中的 'of' 函式（用來建立 Observable 資料）和 Observable 類型
import { of, Observable } from 'rxjs';

// 使用 @Injectable 裝飾器，把這個類別標記為可注入的服務
// providedIn: 'root' 表示這個服務會自動在應用程式啟動時被全域註冊
@Injectable({ providedIn: 'root' })

// 宣告一個名為 MovieService 的服務類別
export class MovieService {
  // 定義一個公開方法 getMovies，回傳型別是 Observable<string[]>
  getMovies(): Observable<string[]> {
    // 使用 RxJS 的 'of' 函式，回傳一個包含電影名稱的 Observable
    // 這模擬從後端或 API 拿到的非同步資料
    // of(...)：快速建立 Observable，用來模擬資料流（真實開發中會用 HttpClient.get()）。
    return of(['全面啟動', '天能', '阿凡達', '玩命關頭']);
  }
}
