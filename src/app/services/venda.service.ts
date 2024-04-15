import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = 'http://localhost:3001/api/vendas';

  constructor(private http: HttpClient) { }

  registrarVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl, venda);
  }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  getVendaById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}` )
  }

  atualizarVenda(id: number, venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${this.baseUrl}/${id}`, venda)
  }
}
