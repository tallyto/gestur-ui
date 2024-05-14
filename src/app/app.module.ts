import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {ConfirmationService, MessageService} from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import {FileUploadModule} from "primeng/fileupload";
import {FornecedorListComponent} from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import {FornecedorFormComponent} from "./components/fornecedor/fornecedor-form/fornecedor-form.component";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputIconModule} from "primeng/inputicon";
import {IconFieldModule} from "primeng/iconfield";
import { LoginComponent } from './components/login/login.component';
import {PasswordModule} from "primeng/password";
import {AuthService} from "./services/auth.service";
import {AuthErrorInterceptor} from "./handlers/AuthHandlerError";
import {AuthInterceptor} from "./handlers/AuthHandlerInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent,
    ClienteListComponent,
    NavbarComponent,
    VendaFormComponent,
    VendaListComponent,
    FornecedorListComponent,
    FornecedorFormComponent,
    LoginComponent
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
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    InputIconModule,
    IconFieldModule,
    PasswordModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
