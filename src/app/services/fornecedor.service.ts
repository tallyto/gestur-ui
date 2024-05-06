import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fornecedor} from "../models/fornecedor.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FornecedorService{
  private baseUrl = `${environment.apiUrl}/api/fornecedores`;

  constructor(private http: HttpClient) {
  }

  cadastrar(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  listar(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.baseUrl}/${id}`, fornecedor);
  }
}
