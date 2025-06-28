import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss']
})
export class Child1Component implements OnInit {
  a: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 讀取查詢參數
    this.route.queryParamMap.subscribe((params) => {
      this.a = params.get('a');
    });
  }
}
