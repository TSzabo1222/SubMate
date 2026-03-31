import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecardsComponent } from './servicecards.component';

describe('ServicecardsComponent', () => {
  let component: ServicecardsComponent;
  let fixture: ComponentFixture<ServicecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicecardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
