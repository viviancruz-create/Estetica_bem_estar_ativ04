import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaEstoque } from './consulta-estoque';

describe('ConsultaEstoque', () => {
  let component: ConsultaEstoque;
  let fixture: ComponentFixture<ConsultaEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaEstoque],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaEstoque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
