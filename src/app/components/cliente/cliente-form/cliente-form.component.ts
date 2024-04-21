import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {


  public clienteForm: FormGroup;
  isCollapsed = false;
  clienteId: number | null = null;
  addressCollapsed = false
  doccumentColapsed = false;

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.clienteForm = this.getClientFormBuilder()
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.clienteId = +id;
        this.loadClienteData(this.clienteId);
      }
    })
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
      cep: [''],
      rua: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      profissao: ['', Validators.required]
    });
  }


  loadClienteData(id: number) {
    this.clienteService.getClienteById(id).subscribe((cliente) => {
      this.clienteForm.patchValue(cliente);
    }
    );
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/cliente']);
  }

  onSubmit() {
    if (this.clienteForm.invalid) {
      return;
    }
    const cliente: Cliente = this.clienteForm.value;
    const clienteObservable = this.clienteId ? this.clienteService.atualizarCliente(this.clienteId, cliente) : this.clienteService.cadastrarCliente(cliente);

    clienteObservable.subscribe({
      next: (value) => {
        const sucessMessage = this.clienteId ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessMessage,
          life: 3000
        });
        this.clienteForm.reset();
        this.goBack();
      },
      error: (err) => {
        const errorMessage = this.clienteId ? 'Erro ao atualizar cliente' : 'Erro ao cadastrar cliente';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000
        });
      }
    })




  }


  buscarEnderecoPorCep() {
    const cep = this.clienteForm.get('cep')?.value;

    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (data) => {
          // @ts-expect-error
          if (!data.erro) {
            this.clienteForm.patchValue({
              rua: data['logradouro'],
              bairro: data['bairro'],
              cidade: data['localidade'],
              estado: data['uf'],
            })
          }
        }
      })
    }
  }

}
