import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneConsultaComponent } from './telefone-consulta.component';

describe('TelefoneConsultaComponent', () => {
  let component: TelefoneConsultaComponent;
  let fixture: ComponentFixture<TelefoneConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefoneConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
