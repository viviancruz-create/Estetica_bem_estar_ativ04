import { Routes } from '@angular/router';
import { CatalogoComponent } from './app/catalogo/catalogo';
import { CarrinhoComponent } from './app/carrinho/carrinho';
import { CadastroClienteComponent } from './app/cadastro-cliente/cadastro-cliente';
import { MeusPedidosComponent } from './app/meus-pedidos/meus-pedidos';

// Componentes Administrativos
import { CrudProdutosComponent } from './admin/crud-produtos/crud-produtos';
import { CrudServicosComponent } from './admin/crud-servicos/crud-servicos';
import { EntradaProdutosComponent } from './admin/entrada-produto/entrada-produto';
import { EstoqueComponent } from './admin/consulta-estoque/consulta-estoque';
import { PedidosAbertosComponent } from './admin/pedidos-aberto/pedidos-aberto';

export const routes: Routes = [
  // ÁREA DA LOJA (CLIENTE)
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro', component: CadastroClienteComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'meus-pedidos', component: MeusPedidosComponent },

  // ÁREA ADMINISTRATIVA (FUNCIONÁRIOS)
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'pedidosaberto', pathMatch: 'full' },
      { path: 'pedidosaberto', component: PedidosAbertosComponent },
      { path: 'crud-produtos', component: CrudProdutosComponent },
      { path: 'crud-servicos', component: CrudServicosComponent },
      { path: 'entradaproduto', component: EntradaProdutosComponent },
      { path: 'consulta-estoque', component: EstoqueComponent }
    ]
  },

  { path: '**', redirectTo: 'catalogo' }
];