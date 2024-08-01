import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficiencySkillsComponent } from './efficiency-skills.component';

describe('EfficiencySkillsComponent', () => {
  let component: EfficiencySkillsComponent;
  let fixture: ComponentFixture<EfficiencySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EfficiencySkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfficiencySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
