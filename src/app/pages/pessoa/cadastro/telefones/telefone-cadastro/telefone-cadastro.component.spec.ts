import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneCadastroComponent } from './telefone-cadastro.component';

describe('TelefoneCadastroComponent', () => {
  let component: TelefoneCadastroComponent;
  let fixture: ComponentFixture<TelefoneCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefoneCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
