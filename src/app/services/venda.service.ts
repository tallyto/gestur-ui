import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Venda} from "../models/venda.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = `${environment.apiUrl}/api/vendas`

  constructor(private http: HttpClient) { }

  cadastrar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl, venda);
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
}
