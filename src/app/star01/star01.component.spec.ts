import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Star01Component } from './star01.component';

describe('Star01Component', () => {
  let component: Star01Component;
  let fixture: ComponentFixture<Star01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Star01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Star01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
