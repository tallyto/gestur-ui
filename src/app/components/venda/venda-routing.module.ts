import { NgModule } from '@angular/core';
import { VendaListComponent } from './venda-list/venda-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VendaFormComponent } from './venda-form/venda-form.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'new', component: VendaFormComponent },
  { path: 'list', component: VendaListComponent},
  { path: 'editar/:id', component: VendaFormComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class VendaRoutingModule { }
