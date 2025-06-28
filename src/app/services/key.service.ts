/**
 * ng generate service services/key
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  // 建立一個可被觀察的 key 狀態，初始為空字串
  private keySubject = new BehaviorSubject<string>('D41D8CD98F00B204E9800998ECF8427E');

  // 提供給元件訂閱的 Observable
  key$ = this.keySubject.asObservable();

  // 設定新值
  setKey(value: string) {
    this.keySubject.next(value);
  }

  // 取得目前值（同步）
  getKey(): string {
    return this.keySubject.value;
  }
}
