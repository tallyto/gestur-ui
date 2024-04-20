import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../../../services/venda.service';
import { Pedido } from '../../../models/pedido.model';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-venda-form',
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
    private pedidoService: VendaService,
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
      itens: [],
    });
  }

  loadPedidoData(id: number) {
    this.pedidoService.buscarPorId(id).subscribe({
      next: (pedido) => {
        this.pedidoForm.patchValue(pedido);
        console.log(this.pedidoForm.value);
        this.loadClienteData();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar venda',
          life: 3000,
        });
      }
    })
  }

  onEdit(arg0: any) {
    throw new Error('Method not implemented.');
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
      ? this.pedidoService.atualizar(this.pedidoId, pedido)
      : this.pedidoService.cadastrar(pedido);

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
          ? 'Erro ao atualizar venda'
          : 'Erro ao cadastrar venda';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000,
        });
      },
    });
  }
}
