import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Venda} from "../models/venda.model";
import {environment} from "../../environments/environment";
import {ItemVenda} from "../models/item-venda.model";

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = `${environment.apiUrl}/api/vendas`

  constructor(private http: HttpClient) { }

  cadastrar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl, venda);
  }

  cadastrarItem(vendaId: number, itemVenda: ItemVenda): Observable<ItemVenda> {
    return this.http.post<ItemVenda>(`${this.baseUrl}/${vendaId}/item`, itemVenda);
  }

  listar(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${this.baseUrl}/${id}`, venda);
  }

  downloadAnexo(vendaId: number, anexoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${vendaId}/anexos/${anexoId}`);
  }

  removeAnexo(vendaId: number, anexoId: number) {
    return this.http.delete(`${this.baseUrl}/${vendaId}/anexos/${anexoId}`);
  }
}
