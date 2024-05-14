import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth.service";



const SUCCESS_MESSAGE = { severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!' };
const ERROR_MESSAGE = {severity: 'error', summary: 'Error', detail: 'Usuário ou senha inválido'};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      {
        next:(loginSuccess) => {
          if (loginSuccess) {
            this.messageService.add(SUCCESS_MESSAGE)
            this.router.navigate(['/venda']);
          } else {
            this.messageService.add(ERROR_MESSAGE)
            // Realizar alguma ação apropriada para tratar o login sem sucesso, se necessário.
          }
        },
        error: (err) => {
          console.log('Erro ao realizar o login:', err);
          // Lidar com os erros de autenticação aqui, se necessário.
        }
      }
    );
  }
}
