import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHealthComponent } from './project-health.component';

describe('ProjectHealthComponent', () => {
  let component: ProjectHealthComponent;
  let fixture: ComponentFixture<ProjectHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
