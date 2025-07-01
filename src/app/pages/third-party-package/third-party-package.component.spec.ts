import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyPackageComponent } from './third-party-package.component';

describe('ThirdPartyPackageComponent', () => {
  let component: ThirdPartyPackageComponent;
  let fixture: ComponentFixture<ThirdPartyPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyPackageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
