import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteRoutingModule} from "./components/cliente/cliente-routing.module";
import {VendaRoutingModule} from './components/venda/venda-routing.module';
import {FornecedorRoutingModule} from "./components/fornecedor/fornecedor-routing.module";

const routes: Routes = [
  {path: '', redirectTo: 'venda', pathMatch: 'full'},
  {path: 'venda', loadChildren: () => VendaRoutingModule},
  {path: 'cliente', loadChildren: () => ClienteRoutingModule},
  {path: 'fornecedor', loadChildren: () => FornecedorRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
