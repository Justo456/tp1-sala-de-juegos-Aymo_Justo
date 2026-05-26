import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaNumero } from './adivina-numero';

describe('AdivinaNumero', () => {
  let component: AdivinaNumero;
  let fixture: ComponentFixture<AdivinaNumero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdivinaNumero],
    }).compileComponents();

    fixture = TestBed.createComponent(AdivinaNumero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
