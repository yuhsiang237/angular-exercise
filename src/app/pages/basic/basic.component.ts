import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  // 1.Interpolation（插值綁定
  // | 用法 | 是否在 Component class 屬性用？ |
  // | -------- | ------------------------ |
  // | `let` | ❌（用於方法內區域變數）             |
  // | `const` | ❌（同上，方法內或全域常數）           |
  // | 直接寫變數名宣告 | ✅（Component 屬性宣告）        |
  // 常數 (不可改變)
  // readonly MAX_SEATS = 100;
  title = 'Hello Angular!'; 
  // 2. Property Binding[]
  isDisabled = true;
  // 3. Event Binding ( )
  count = 0;
  increaseCount() {
    this.count++;
  }
  //4. 雙向綁定[(ngModel)]（需引入 FormsModule）
  name = 'John';
  //5. 條件渲染 *ngIf
  isVisible = true;
  //6.列表渲染 *ngFor
  items = ['Apple', 'Banana', 'Cherry'];
  /**
   * 直接在 class 定義變數，如 count = 0;，Template 綁定自動更新
   * 直接定義物件，如 state = { name: 'Tom' };，Angular 的變更檢測會偵測到改變
   */
  cinemas = [
    {
      name: '信義威秀',
      location: '台北市信義區',
      movies: [
        { title: '航海王劇場版', time: '14:00' },
        { title: '你的名字', time: '16:30' }
      ]
    },
    {
      name: '台中大遠百',
      location: '台中市西屯區',
      movies: [
        { title: '灌籃高手', time: '15:00' },
        { title: '鈴芽之旅', time: '18:00' }
      ]
    }
  ];
  //7. Class / Style 綁定
  isActive = true;
  //8.對應：getter(即vue3的computed)
  get doubleCount() {
    return this.count * 2;
  }
  // 9. 使用 BehaviorSubject模擬vue3 watch
  // 9.1使用 BehaviorSubject 來建立一個可被訂閱的數字狀態，初始值為 0
  number = new BehaviorSubject(0);
  increment() {
    // 取得目前的數值
    const current = this.number.value;
    // 發送新的數值，觸發訂閱者
    this.number.next(current + 1);
  }
  constructor() { 
    // 訂閱 number 的變化（watch）
    /**
     * 為什麼要放在 constructor 或 ngOnInit
      你想在元件「建立或初始化時」開始監聽這個 Observable
      確保訂閱在元件生命週期內有效，避免多次重複訂閱或漏訂閱
      constructor 主要做「元件建構時要做的事」
      ngOnInit 是 Angular 生命週期中「元件初始化完成後」呼叫，比較推薦放監聽（subscription）在這
     */
    this.number.subscribe(value => {
      console.log('number 改變了:', value);
      // 這裡可以執行任何副作用，例如觸發其他邏輯或呼叫 API
    });
  }

  ngOnInit(): void {
  }

}
