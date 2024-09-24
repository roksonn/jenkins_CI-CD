import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouWinComponent } from './you-win.component';

describe('YouWinComponent', () => {
  let component: YouWinComponent;
  let fixture: ComponentFixture<YouWinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YouWinComponent]
    });
    fixture = TestBed.createComponent(YouWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
