import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StartPageComponent } from "./start-page.component";

describe("StartPageComponent", () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartPageComponent],
    });
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // Test 1 (should pass)
  it("should initialize with an empty games array", () => {
    expect(component.games.length).toBe(0);
  });

  // Test 2 (should pass)
  it("should populate games array with 3 random minigames after shuffle is called", () => {
    component.shuffle();
    expect(component.games.length).toBe(3);
    expect(
      component.games.every((game) => component.minigamesArray.includes(game))
    ).toBeTrue();
  });

  // Test 3 (should fail)
  it("should remove all minigames from the scenario after shuffle is called", () => {
    component.shuffle();
    expect(
      StartPageComponent.scenarios[StartPageComponent.rand].minigames.length
    ).toBe(0); // This will fail because games are added after shuffle
  });
});
