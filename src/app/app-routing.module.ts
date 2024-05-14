import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteRoutingModule} from "./components/cliente/cliente-routing.module";
import {VendaRoutingModule} from './components/venda/venda-routing.module';
import {FornecedorRoutingModule} from "./components/fornecedor/fornecedor-routing.module";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'venda', pathMatch: 'full'},
  {path: 'venda', loadChildren: () => VendaRoutingModule},
  {path: 'cliente', loadChildren: () => ClienteRoutingModule},
  {path: 'fornecedor', loadChildren: () => FornecedorRoutingModule},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
