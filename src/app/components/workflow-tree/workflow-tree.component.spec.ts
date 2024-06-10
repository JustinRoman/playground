import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTreeComponent } from './workflow-tree.component';

describe('WorkflowTreeComponent', () => {
  let component: WorkflowTreeComponent;
  let fixture: ComponentFixture<WorkflowTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
