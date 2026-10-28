import { Routes } from '@angular/router';
import { CatalogoComponent } from './app/catalogo/catalogo';
import { CadastroClienteComponent } from './app/cadastro-cliente/cadastro-cliente';
import { CarrinhoComponent } from './app/carrinho/carrinho';
import { MeusPedidosComponent } from './app/meus-pedidos/meus-pedidos';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'meus-pedidos', component: MeusPedidosComponent },
  { path: '**', redirectTo: 'catalogo' }
];