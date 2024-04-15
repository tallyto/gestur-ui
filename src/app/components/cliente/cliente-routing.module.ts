import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClienteFormComponent} from "./cliente-form/cliente-form.component";
import {ClienteListComponent} from "./cliente-list/cliente-list.component";


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'new', component: ClienteFormComponent },
  { path: 'list', component: ClienteListComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
