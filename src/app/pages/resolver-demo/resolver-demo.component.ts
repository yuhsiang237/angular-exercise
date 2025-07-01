import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolver-demo',
  templateUrl: './resolver-demo.component.html',
  styleUrls: ['./resolver-demo.component.scss']
})
export class ResolverDemoComponent implements OnInit {
  movies: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movies = this.route.snapshot.data['movies'];
  }
}
