import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateweborderComponent } from './createweborder.component';

describe('CreateweborderComponent', () => {
  let component: CreateweborderComponent;
  let fixture: ComponentFixture<CreateweborderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateweborderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateweborderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
