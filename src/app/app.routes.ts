import { Routes } from '@angular/router';
import { CatalogoComponent } from './app/catalogo/catalogo';
import { CarrinhoComponent } from './app/carrinho/carrinho';
import { CadastroClienteComponent } from './app/cadastro-cliente/cadastro-cliente';
import { CrudProdutosComponent } from './admin/crud-produtos/crud-produtos';
import { CrudServicosComponent } from './admin/crud-servicos/crud-servicos'; // Importação da pasta admin

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'crud-produtos', component: CrudProdutosComponent },
  { path: 'crud-servicos', component: CrudServicosComponent }, // Nova rota
  { path: '**', redirectTo: 'catalogo' }
];