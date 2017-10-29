import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSummaryCardComponent } from './stock-summary-card.component';

describe('StockSummaryCardComponent', () => {
  let component: StockSummaryCardComponent;
  let fixture: ComponentFixture<StockSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
