import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoNewsComponent } from './crypto-news.component';

describe('CryptoNewsComponent', () => {
  let component: CryptoNewsComponent;
  let fixture: ComponentFixture<CryptoNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
