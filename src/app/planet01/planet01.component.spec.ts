import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Planet01Component } from './planet01.component';

describe('Planet01Component', () => {
  let component: Planet01Component;
  let fixture: ComponentFixture<Planet01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Planet01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Planet01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
