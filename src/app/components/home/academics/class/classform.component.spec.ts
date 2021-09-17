import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassformComponent } from './classform.component';

describe('ClassformComponent', () => {
  let component: ClassformComponent;
  let fixture: ComponentFixture<ClassformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
