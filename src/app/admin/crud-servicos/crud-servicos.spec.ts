import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudServicos } from './crud-servicos';

describe('CrudServicos', () => {
  let component: CrudServicos;
  let fixture: ComponentFixture<CrudServicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudServicos],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudServicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
