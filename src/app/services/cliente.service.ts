import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  getClientes(): Observable<Cliente[]> { 
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  private baseUrl = 'http://localhost:3001/api/clientes'; // Altere a URL de acordo com a sua API backend

  constructor(private http: HttpClient) { }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }
}
