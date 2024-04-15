import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClienteRoutingModule} from "./components/cliente/cliente-routing.module";
import { ProdutoRoutingModule } from './components/produto/produto-routing.module';
import { PedidoRoutingModule } from './components/pedido/pedido-routing.module';

const routes: Routes = [
    { path: '', redirectTo: 'pedido', pathMatch: 'full' },
    { path: 'pedido', loadChildren: () => PedidoRoutingModule},
    {path: 'cliente', loadChildren: () => ClienteRoutingModule},
    {path: 'produto', loadChildren: () => ProdutoRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
