import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharevarComponent } from './sharevar.component';

describe('SharevarComponent', () => {
  let component: SharevarComponent;
  let fixture: ComponentFixture<SharevarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharevarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SharevarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
