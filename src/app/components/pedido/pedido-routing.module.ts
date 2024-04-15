import { NgModule } from '@angular/core';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'new', component: PedidoFormComponent },
  { path: 'list', component: PedidoListComponent},
  { path: 'editar/:id', component: PedidoFormComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class PedidoRoutingModule { }
