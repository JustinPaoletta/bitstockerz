import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPlaygroundComponent } from './trading-playground.component';

describe('TradingPlaygroundComponent', () => {
  let component: TradingPlaygroundComponent;
  let fixture: ComponentFixture<TradingPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingPlaygroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
