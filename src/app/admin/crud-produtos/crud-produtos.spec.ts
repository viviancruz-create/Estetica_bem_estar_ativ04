import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProdutos } from './crud-produtos';

describe('CrudProdutos', () => {
  let component: CrudProdutos;
  let fixture: ComponentFixture<CrudProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
