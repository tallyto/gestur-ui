import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PedidoFormComponent } from './components/pedido/pedido-form/pedido-form.component';
import { PedidoListComponent } from './components/pedido/pedido-list/pedido-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent,
    ClienteListComponent,
    NavbarComponent,
    ProdutoFormComponent,
    ProdutoListComponent,
    PedidoFormComponent,
    PedidoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    PanelModule,
    BrowserAnimationsModule,
    MenubarModule,
    MessagesModule,
    ToastModule,
    CardModule,
    DividerModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
