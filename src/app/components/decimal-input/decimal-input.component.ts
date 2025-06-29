import { Component, Input, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-decimal-input',
  templateUrl: './decimal-input.component.html',
  providers: [
    {
      /**
       * 	告訴 Angular：「我要提供 ControlValueAccessor 的功能」。這是 Angular 表單系統用來與 input/元件溝通的介面 token。
       *NG_VALUE_ACCESSOR 是 Angular 表單系統內建的「系統提供的識別符號（token）」，而且是你要讓元件當作表單輸入欄位時，必須加上去的關鍵註冊項目。
        NG_VALUE_ACCESSOR	控制元件作為表單輸入欄位	ControlValueAccessor
        NG_VALIDATORS	自訂同步驗證器	Validator
        NG_ASYNC_VALIDATORS	自訂非同步驗證器	Async Validator
        NG_CONTROL	內部控制元件的抽象類型	一般不手動用
        NG_MODEL_GROUP	ngModelGroup 注入	內部使用
       */
      provide: NG_VALUE_ACCESSOR,
      /**
       * 指定這個元件（DecimalInputComponent）就是實作者。因為這段程式碼還在元件定義中，所以需要用 forwardRef 來延遲解析（避免 circular reference）
      forwardRef 是 Angular 提供的函式，讓你「延遲執行」裡面的函式，直到整個類別被完全定義完成才執行
      避免上述引用錯誤，讓 DI 系統能正常找到 DecimalInputComponent 
      */
      useExisting: forwardRef(() => DecimalInputComponent),
      /**
       * 	表示可以有多個 NG_VALUE_ACCESSOR 被註冊（Angular 表單預設就有一組）。這邊設成 true，讓 Angular 把你這個元件「加到表單系統中」，而不是取代原本的 input 類型。
       代表這個 provider 是「多重提供者」(multi-provider)
Angular 會把同一個 token（像 NG_VALUE_ACCESSOR）的所有提供者收集成陣列
意思是你可以有多個不同的元件或 directive 同時註冊這個 token，Angular 會依序使用它們（例如驗證器會全部執行）
     NG_VALUE_ACCESSOR、NG_VALIDATORS 等都是設計為 multi-provider
你必須加 multi: true，才能和 Angular 預設的內建 provider 共存，或多個自訂 validator 共存
*/
      multi: true
    }
  ]
})
/**
 * ControlValueAccessor 是 Angular 表單系統裡的一個介面 (interface)，它定義了一組規範，讓你可以把自訂元件（如自訂輸入框、下拉選單等）包裝成 Angular 表單能識別並操作的「表單控制元件」。
 */
export class DecimalInputComponent implements ControlValueAccessor {
  @Input() decimalPlaces: number = 2;

  displayValue: string = '';
  /**
   * 
預設空函式，用來先佔位，避免未註冊前呼叫會出錯。
目的是 儲存 Angular 表單傳進來的回呼函式（分別是值變更和欄位觸碰的通知函式）。

   */
  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['decimalPlaces']) {
      // 當 decimalPlaces 改變，重新格式化 displayValue
      this.displayValue = this.formatValue(this.displayValue, this.decimalPlaces);
      this.onChange(this.displayValue);
    }
  }

  onInput(event: any) {
    this.displayValue = event.target.value;
    // 不立即限制小數位數，允許自由輸入
    this.onChange(this.displayValue); // 可視需求決定是否這裡也傳出變更
  }

  private formatValue(value: string, d: number): string {
    const regex = new RegExp(`^(\\d+)(\\.\\d{0,${d}})?`);
    const match = value.match(regex);

    if (match) {
      // 取匹配的部分（最大保留 decimalPlaces 位小數）
      value = match[0];
    } else {
      // 不符合格式就清空（或你想保留原值）
      value = '';
    }
    return value;
  }

  // ✅ 公開方法給 template 呼叫
  markAsTouched(): void {
    this.displayValue = this.formatValue(this.displayValue, this.decimalPlaces);
    this.onChange(this.displayValue);
    this.onTouched();
  }
  //  Angular ControlValueAccessor 介面裡必須實作的方法，讓你的自訂元件能和 Angular 表單系統雙向綁定並同步狀態。以下是詳細解釋：
  /***
   * 作用：當 Angular 表單給元件一個新值（例如表單初始化或外部程式改變值時）會呼叫這個方法。
你的寫法：把傳進來的 value 轉成字串，並更新元件內部 displayValue（就是輸入框要顯示的文字）。
簡單說：表單「寫入」值到元件，更新畫面顯示。
   */
  writeValue(value: any): void {
    // 初始賦值時呼叫
    const strValue = value ? String(value) : '';
    this.displayValue = this.formatValue(strValue, this.decimalPlaces);
    this.onChange(this.displayValue);
  }
  //  Angular ControlValueAccessor 介面裡必須實作的方法，讓你的自訂元件能和 Angular 表單系統雙向綁定並同步狀態。以下是詳細解釋：
  /***
   * 作用：Angular 表單會呼叫這個方法，並傳入一個「當元件值改變時要呼叫的回調函式」。

你的寫法：把 Angular 傳來的函式存到 this.onChange，以便元件內部需要通知外面值改變時呼叫它。

簡單說：註冊一個回調，告訴 Angular「元件值變了，你要通知我」。
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  //  Angular ControlValueAccessor 介面裡必須實作的方法，讓你的自訂元件能和 Angular 表單系統雙向綁定並同步狀態。以下是詳細解釋：
  /**
   * 
   * @param fn 作用：Angular 表單會呼叫這個方法，並傳入一個「當元件被觸碰（blur 等）時要呼叫的回調函式」。

你的寫法：把 Angular 傳來的函式存到 this.onTouched，元件在適當時候（通常失焦）呼叫它。

簡單說：註冊一個回調，告訴 Angular「元件被使用者觸碰過了」。
   */
  registerOnTouched(fn: any): void {
    //這行是把 Angular 表單系統傳進來的「觸碰事件回呼函式」存起來，方便你元件在適當時候（通常是輸入框失焦時）呼叫它。
    //這個 fn 是 Angular 表單內部用來更新欄位狀態的方法。
    this.onTouched = fn;
  }
}
