import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDialogComponent } from './instance-dialog.component';

describe('InstanceDialogComponent', () => {
  let component: InstanceDialogComponent;
  let fixture: ComponentFixture<InstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
