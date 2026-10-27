import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'meus-pedidos', component: MeusPedidosComponent },
  { path: '**', redirectTo: 'catalogo' }
];