import { Routes } from '@angular/router';
import { CatalogoComponent } from './app/catalogo/catalogo';
import { CarrinhoComponent } from './app/carrinho/carrinho';
import { CadastroClienteComponent } from './app/cadastro-cliente/cadastro-cliente';
import { MeusPedidosComponent } from './app/meus-pedidos/meus-pedidos';
import { CrudProdutosComponent } from './admin/crud-produtos/crud-produtos';
import { CrudServicosComponent } from './admin/crud-servicos/crud-servicos';
import { EntradaProdutosComponent } from './admin/entrada-produto/entrada-produto';
import { PedidosAbertosComponent } from './admin/pedidos-aberto/pedidos-aberto';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro', component: CadastroClienteComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'meus-pedidos', component: MeusPedidosComponent },
  { path: 'crud-produtos', component: CrudProdutosComponent },
  { path: 'crud-servicos', component: CrudServicosComponent },
  { path: 'entradaproduto', component: EntradaProdutosComponent },
  { path: 'pedidosaberto', component: PedidosAbertosComponent },
  { path: '**', redirectTo: 'catalogo' }
];