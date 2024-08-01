import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalConsiderationsComponent } from './additional-considerations.component';

describe('AdditionalConsiderationsComponent', () => {
  let component: AdditionalConsiderationsComponent;
  let fixture: ComponentFixture<AdditionalConsiderationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalConsiderationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalConsiderationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
