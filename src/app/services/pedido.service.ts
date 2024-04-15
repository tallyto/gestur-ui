import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:3001/api/pedido'; // Altere a URL base de acordo com a sua API de Pedido

  constructor(private http: HttpClient) { }

  cadastrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  atualizarPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${id}`, pedido);
  }
}
