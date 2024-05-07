import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FornecedorListComponent} from "./fornecedor-list/fornecedor-list.component";
import {FornecedorFormComponent} from "./fornecedor-form/fornecedor-form.component";


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'new', component: FornecedorFormComponent},
  {path: 'list', component: FornecedorListComponent},
  {path: 'editar/:id', component: FornecedorFormComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class FornecedorRoutingModule {
}
