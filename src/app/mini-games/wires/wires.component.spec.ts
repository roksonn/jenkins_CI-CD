import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiresComponent } from './wires.component';

describe('WiresComponent', () => {
  let component: WiresComponent;
  let fixture: ComponentFixture<WiresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WiresComponent]
    });
    fixture = TestBed.createComponent(WiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
