import { Component, OnInit } from '@angular/core';
import { KeyService } from '../../services/key.service';

@Component({
  selector: 'app-sharevar',
  templateUrl: './sharevar.component.html',
  styleUrls: ['./sharevar.component.scss']
})
export class SharevarComponent implements OnInit {
  key: string = '';

  constructor(private keyService: KeyService) { }

  ngOnInit(): void {
    // 初始化顯示 key 的值
    //this.key = this.keyService.getKey();
  }

  save() {
    this.keyService.setKey(this.key);
  }

  get currentKey(): string {
    return this.keyService.getKey();
  }

}
