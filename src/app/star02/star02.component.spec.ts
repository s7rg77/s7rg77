import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Star02Component } from './star02.component';

describe('Star02Component', () => {
  let component: Star02Component;
  let fixture: ComponentFixture<Star02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Star02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Star02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
