import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.scss']
})
export class LifecycleComponent implements OnInit, OnDestroy {
  /**
   * @Input() 是 Angular 中的一個 裝飾器（Decorator），它的作用是：
  允許父元件（Parent Component）傳值給子元件（Child Component）使用。
   */
  /**
   * 這個驚嘆號 ! 是 TypeScript 的 「後綴斷言運算子（Definite Assignment Assertion）」。
   * 「我保證這個變數稍後一定會被賦值，請 TypeScript 不要報錯。」
   */
  @Input() title!: string;
  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
    //API載入時寫這
  }
  ngOnDestroy() {
    console.log('ngOnDestroy - 元件將被移除，做清理');
  }
}

/**
 * 
 * 生命週期函式	時機點	常見用途
constructor()	類別建構時（最先）	建立物件、注入服務（不能存取 input 或 DOM）
ngOnInit()	初始化後（一次）	初始化資料、呼叫 API、可以存取 @Input
ngOnChanges()	@Input() 變化時觸發（可多次）	偵測父元件傳來資料變化
ngDoCheck()	自訂變更檢查邏輯（每次變更檢測都會觸發）	手動檢查非 @Input 的變化（較少用）
ngAfterContentInit()	ng-content 投影內容初始化完成	投影內容已載入（可看作 Vue 的 slot 掛勾）
ngAfterContentChecked()	投影內容變更檢查後	偵測 slot 內容是否變化
ngAfterViewInit()	元件自己模板與子元件載入後（僅一次）	可以安全操作 DOM（ViewChild）
ngAfterViewChecked()	檢查完子元件與模板之後	DOM 有更新（會常常觸發）
ngOnDestroy()	元件被移除前（只觸發一次）	清理訂閱、計時器、釋放資源等

--
constructor
 ↓
ngOnChanges (如果有 @Input)
 ↓
ngOnInit
 ↓
ngDoCheck
 ↓
ngAfterContentInit
 ↓
ngAfterContentChecked
 ↓
ngAfterViewInit
 ↓
ngAfterViewChecked
 ↓
（之後變更檢測會重複觸發：
   ngDoCheck → ngAfterContentChecked → ngAfterViewChecked）
 ↓
ngOnDestroy（離開時）

 */
