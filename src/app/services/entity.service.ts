import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class EntityService<T> {
  constructor(private http: HttpClient, private baseUrl: string) { }

  cadastrar(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
