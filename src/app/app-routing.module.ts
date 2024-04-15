import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VendaRoutingModule} from "./components/venda/venda-routing.module";
import {ClienteRoutingModule} from "./components/cliente/cliente-routing.module";

const routes: Routes = [
    { path: '', redirectTo: 'vendas', pathMatch: 'full' },
    { path: 'vendas', loadChildren: () => VendaRoutingModule},
    {path: 'cliente', loadChildren: () => ClienteRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
