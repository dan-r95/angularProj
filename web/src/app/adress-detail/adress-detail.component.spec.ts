import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressDetailComponent } from './adress-detail.component';

describe('AdressDetailComponent', () => {
  let component: AdressDetailComponent;
  let fixture: ComponentFixture<AdressDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdressDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
