import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouLoseComponent } from './you-lose.component';

describe('YouLoseComponent', () => {
  let component: YouLoseComponent;
  let fixture: ComponentFixture<YouLoseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YouLoseComponent]
    });
    fixture = TestBed.createComponent(YouLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
