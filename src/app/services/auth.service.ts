import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {getTenantFromEmail} from "../utils/Util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';
  baseUrl: string

  constructor(private http: HttpClient,
              private router: Router) {
    this.baseUrl = `${environment.apiUrl}/api/v1/auth/login`
  }

  // Método para realizar login e obter o token JWT
  login(username: string, password: string): Observable<boolean> {
    const loginData = {
      email: username,
      password: password
    };

    // Substitua a URL pelo endpoint da API de login fornecido pelo cURL
    return this.http.post<any>(this.baseUrl, loginData, {
      headers: {
        'x-private-tenant': getTenantFromEmail(username)
      }
    }).pipe(
      tap((response) => {
        // Se a resposta da API contiver o token JWT, armazene-o e defina o estado de autenticação como verdadeiro
        if (response.accessToken) {
          this.token = response.accessToken;
          // Armazene o token no localStorage (opcional)
          localStorage.setItem('accessToken', this.token);
        }
      }),
      map((response) => !!response.accessToken), // Retorna true se o token existir e false se não existir
      catchError((error) => {
        console.log('Erro ao realizar o login:', error);
        return of(false);
      })
    );
  }


  public decodePayloadJWT(): any {
    try {
      return jwtDecode(this.getToken())
    } catch (error) {
      return null
    }
  }

  hasPermition(permition: string) {
    return this.decodePayloadJWT() && this.decodePayloadJWT().role === permition
  }

  getRole(): string {
    if (this.decodePayloadJWT()) {
      return this.decodePayloadJWT().role
    }
    return ''
  }

  isTokenExpired(): boolean {
    try {
      const decodedToken: any = this.decodePayloadJWT()
      const expirationTime: number = decodedToken.exp;
      const currentTime: number = Math.floor(Date.now() / 1000);
      return currentTime >= expirationTime;
    } catch (error) {
      return true; // Em caso de erro ou token inválido, consideramos como expirado.
    }
  }

  // Método para realizar logout e limpar o estado de autenticação e o token
  logout(): void {
    localStorage.setItem('accessToken', '');
    this.router.navigate(['/login'])
  }

  // Método para obter o token JWT
  getToken(): string {
    return localStorage.getItem('accessToken') || '';
  }
}
