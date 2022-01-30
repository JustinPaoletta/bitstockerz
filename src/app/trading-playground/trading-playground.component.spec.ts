import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPlaygroundComponent } from './trading-playground.component';

describe('TradingPlaygroundComponent', () => {
  let component: TradingPlaygroundComponent;
  let fixture: ComponentFixture<TradingPlaygroundComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradingPlaygroundComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
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
