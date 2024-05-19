import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {getTenantFromEmail} from "../utils/Util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifique se o usuário está autenticado antes de enviar o token

    const token = this.authService.getToken();
    const decodedToken = this.authService.decodePayloadJWT();
    if (token && !this.authService.isTokenExpired()) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-Private-Tenant': getTenantFromEmail(decodedToken.sub)
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req)

  }
}
