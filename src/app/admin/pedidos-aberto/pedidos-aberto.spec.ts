import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosAberto } from './pedidos-aberto';

describe('PedidosAberto', () => {
  let component: PedidosAberto;
  let fixture: ComponentFixture<PedidosAberto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosAberto],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosAberto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
