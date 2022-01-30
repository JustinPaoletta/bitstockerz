import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSpinnerComponent } from './coin-spinner.component';

describe('CoinSpinnerComponent', () => {
  let component: CoinSpinnerComponent;
  let fixture: ComponentFixture<CoinSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinSpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
