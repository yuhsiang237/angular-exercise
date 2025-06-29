import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, tap, concat, scan } from 'rxjs';

@Component({
  selector: 'app-api-demo',
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})
export class ApiDemoComponent implements OnInit {
  callAPIByForkJoinResult: string = '';
  callAPIByConcatResult: string = '';
  // Observable 變數，後綴加 $
  // $ 是命名慣例，讓程式碼一看就知道這是 Observable，不是一般資料。
  callAPIByForkJoin$ = forkJoin([
    this.http.get('assets/API1.json'),
    this.http.get('assets/API2.json'),
    this.http.get('assets/API3.json')
  ]);

  // $ 是命名慣例，讓程式碼一看就知道這是 Observable，不是一般資料。
  callAPIByConcat$ = concat(
    // concat 將多個 Observable 依序串接，上一個完成後才呼叫下一個

    this.http.get('assets/API1.json').pipe(
      tap((res) => console.log('API1:', res)) // API1 回傳結果時，印出來（可做其他小處理）
    ),

    this.http.get('assets/API2.json').pipe(
      tap((res) => console.log('API2:', res)) // API2 回傳結果時，印出來
    ),

    this.http.get('assets/API3.json').pipe(
      tap((res) => console.log('API3:', res)) // API3 回傳結果時，印出來
    )
    /**
     * 在 RxJS 和 Angular 裡，pipe 是用來**串接多個操作子（operators）**的方法，讓 Observable 的資料流依序經過這些操作子處理。
     * Observable 本身是一個資料流，pipe 讓你把多個操作子組合起來，依序對資料流做變換、過濾、累積、副作用等處理。

每個操作子（像 map, tap, filter, scan, concatMap 等）都是一個純函式，接受 Observable，回傳新的 Observable。
比如：
this.http.get('url').pipe(
  tap(res => console.log('接收到資料', res)),  // 副作用: 印 log
  map(res => res.data),                          // 轉換: 取出資料欄位
  filter(data => data.length > 0)                // 過濾: 只要非空陣列
)
pipe 裡會依序呼叫 tap → map → filter，讓你把資料流一步步加工。

     */
  ).pipe(
    // scan 是 RxJS 的累積操作子，類似陣列的 reduce，
    // 這裡將每次回傳的資料加入累積陣列 acc 中，初始值為空陣列 []（用 any[] 型別）

    scan((acc, curr) => [...acc, curr], [] as any[]),
    /**
     * tap 的設計原則確實是不改變資料流本身，也就是說它不會改變 Observable 傳出的資料內容。
     * 在此的 tap 裡做的是修改元件的外部狀態（成員變數），並不是修改 Observable 裡流動的資料。
     * Observable 的資料流是「results」這個陣列，你沒有更動這個陣列本身，而是把它序列化成字串，存在元件另一個變數 callAPIByConcatResult。

這種行為是「副作用（side effect）」，讓 UI 能更新，但 Observable 流的資料本體沒有被改變。
     */
    tap((results) => {
      // 每次累積陣列更新時，執行此 tap
      // 將累積的結果轉成 JSON 字串，更新給 UI 綁定的變數 callAPIByConcatResult
      //UI 與邏輯分離：資料流專注產生資料，UI 更新交給 tap 和 Angular 變數綁定
      this.callAPIByConcatResult = JSON.stringify(results);
    })
  );

  constructor(private http: HttpClient) {}

  callAPIByConcact(): void {
    this.callAPIByConcat$.subscribe({
      next: (results) => {
        console.log('API累積結果:', results);
      },
      complete: () => {
        console.log('所有 API 順序呼叫完成 ✅');
      },
      error: (err) => {
        console.error('API 呼叫失敗', err);
      }
    });
  }
  callAPIByForkJoin(): void {
    // 用訂閱呼叫 Observable
    this.callAPIByForkJoin$.subscribe({
      /***
       * 是 RxJS 的 subscribe() 方法中的 觀察者物件（observer object），用來處理 Observable 的三種事件：
      next	當 Observable 有資料回傳時執行。這裡將資料 data 存到 this.results
error	如果呼叫過程中發生錯誤（如 404、網路錯誤），就執行這段錯誤處理程式碼 
      */
      next: (data) => {
        // 資料正確取得時
        this.callAPIByForkJoinResult = JSON.stringify(data);
      },
      error: (err) => {
        // 發生錯誤時
        console.error('API error:', err);
      }
    });
  }
  ngOnInit(): void {}
}
