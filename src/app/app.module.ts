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
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import {FileUploadModule} from "primeng/fileupload";
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import {FornecedorFormComponent} from "./components/fornecedor/fornecedor-form/fornecedor-form.component";
import {TagModule} from "primeng/tag";

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent,
    ClienteListComponent,
    NavbarComponent,
    ProdutoFormComponent,
    ProdutoListComponent,
    VendaFormComponent,
    VendaListComponent,
    FornecedorListComponent,
    FornecedorFormComponent
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
        InputTextareaModule,
        FileUploadModule,
        TagModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
