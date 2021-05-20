import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDovesComponent } from './add-doves.component';

describe('AddDovesComponent', () => {
  let component: AddDovesComponent;
  let fixture: ComponentFixture<AddDovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
