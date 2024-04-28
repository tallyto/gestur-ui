import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private baseUrl = `${environment.apiUrl}/api/clientes`;
  constructor(private http: HttpClient) { }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  atualizarCliente(clienteId: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${clienteId}`, cliente);

  }

  getClienteById(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${clienteId}`);
  }
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

}
