import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service'; 
import { Pedido } from '../../../models/pedido.model'; 
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css'],
})
export class PedidoFormComponent implements OnInit {
  public pedidoForm: FormGroup;
  isCollapsed = false;
  pedidoId: number | null = null;
  clientes: Cliente[]

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService, 
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pedidoForm = this.getPedidoFormBuilder();
  
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.pedidoId = +id;
        this.loadPedidoData(this.pedidoId);
      } else {
        this.loadClienteData();
      }
    });
  }

  getPedidoFormBuilder() {
    return this.fb.group({
      cliente: ['', Validators.required], 
      dataPedido: ['', Validators.required], 
      status: ['', Validators.required],
    });
  }

  loadPedidoData(id: number) {
    // Implemente a lógica para carregar os dados do pedido pelo ID, se necessário
  }

  loadClienteData() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      }
    })
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/pedido']);
  }

  onSubmit() {
    if (this.pedidoForm.invalid) {
      return;
    }
    const pedido: Pedido = this.pedidoForm.value;
    const pedidoObservable = this.pedidoId
      ? this.pedidoService.atualizarPedido(this.pedidoId, pedido)
      : this.pedidoService.cadastrarPedido(pedido);

    pedidoObservable.subscribe({
      next: () => {
        const sucessoMessage = this.pedidoId
          ? 'Pedido atualizado com sucesso!'
          : 'Pedido cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        this.pedidoForm.reset();
        this.goBack();
      },
      error: () => {
        const errorMessage = this.pedidoId
          ? 'Erro ao atualizar pedido'
          : 'Erro ao cadastrar pedido';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000,
        });
      },
    });
  }
}
