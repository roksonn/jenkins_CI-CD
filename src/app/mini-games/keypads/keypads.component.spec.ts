import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadsComponent } from './keypads.component';

describe('KeypadsComponent', () => {
  let component: KeypadsComponent;
  let fixture: ComponentFixture<KeypadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeypadsComponent]
    });
    fixture = TestBed.createComponent(KeypadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
