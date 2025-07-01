import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolverDemoComponent } from './resolver-demo.component';

describe('ResolverDemoComponent', () => {
  let component: ResolverDemoComponent;
  let fixture: ComponentFixture<ResolverDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolverDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResolverDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
