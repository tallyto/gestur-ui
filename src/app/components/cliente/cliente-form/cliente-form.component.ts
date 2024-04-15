import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  public clienteForm: FormGroup;
  isCollapsed = true; // Flag to control collapse state
  
  constructor(private fb: FormBuilder, 
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.clienteForm = this.getClientFormBuilder()
  }



  getClientFormBuilder() {
    return this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      renda: ['', Validators.required],
      profissao: ['', Validators.required]
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
      const cliente: Cliente = this.clienteForm.value;
      this.clienteService.cadastrarCliente(cliente)
        .subscribe({
          next: (value) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Cliente cadastrado com sucesso!',
              life: 3000
            });
            this.clienteForm.reset(); // Limpa o formulário após o cadastro.
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao cadastrar cliente',
              life: 3000
            });
          },
        });
  
  }
}
