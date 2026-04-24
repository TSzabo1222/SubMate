import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepoopupservicesComponent } from './updatepoopupservices.component';

describe('UpdatepoopupservicesComponent', () => {
  let component: UpdatepoopupservicesComponent;
  let fixture: ComponentFixture<UpdatepoopupservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatepoopupservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepoopupservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
