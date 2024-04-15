import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {VendaFormComponent} from "./venda-form/venda-form.component";
import {VendaListComponent} from "./venda-list/venda-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'new', component: VendaFormComponent },
  { path: 'list', component: VendaListComponent },
  { path: 'editar/:id', component: VendaFormComponent } // Rota para editar venda com ID
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
