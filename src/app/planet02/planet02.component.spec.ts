import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Planet02Component } from './planet02.component';

describe('Planet02Component', () => {
  let component: Planet02Component;
  let fixture: ComponentFixture<Planet02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Planet02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Planet02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
