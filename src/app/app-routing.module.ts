import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteRoutingModule} from "./components/cliente/cliente-routing.module";
import {ProdutoRoutingModule} from './components/produto/produto-routing.module';
import {VendaRoutingModule} from './components/venda/venda-routing.module';

const routes: Routes = [
  {path: '', redirectTo: 'venda', pathMatch: 'full'},
  {path: 'venda', loadChildren: () => VendaRoutingModule},
  {path: 'cliente', loadChildren: () => ClienteRoutingModule},
  {path: 'produto', loadChildren: () => ProdutoRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
