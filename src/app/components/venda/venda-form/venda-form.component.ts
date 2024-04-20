import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../../../services/venda.service';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import {Venda} from "../../../models/venda.model";

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent implements OnInit {

  public vendaForm: FormGroup;
  isCollapsed = false;
  vendaId: number | null = null;
  clientes: Cliente[]

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vendaForm = this.getVendaFormBuilder();

    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.vendaId = +id;
        this.loadVendaData(this.vendaId);
      } else {
        this.loadClienteData();
      }
    });
  }

  getVendaFormBuilder(): FormGroup {
    return this.fb.group({
      cliente: ['', Validators.required],
      dataEmbarque: ['', Validators.required],
      dataDesembarque: ['', Validators.required],
      status: ['', Validators.required],
      itens: [],
    });
  }

  loadVendaData(id: number) {
    this.vendaService.buscarPorId(id).subscribe({
      next: (venda) => {
        this.vendaForm.patchValue(venda);
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
    this.router.navigate(['/venda']);
  }

  onSubmit() {
    if (this.vendaForm.invalid) {
      return;
    }
    const venda: Venda =  this.vendaForm.value;
    const vendaObservable = this.vendaId
      ? this.vendaService.atualizar(this.vendaId, venda)
      : this.vendaService.cadastrar(venda);

    vendaObservable.subscribe({
      next: () => {
        const sucessoMessage = this.vendaId
          ? 'Pedido atualizado com sucesso!'
          : 'Pedido cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        this.vendaForm.reset();
        this.goBack();
      },
      error: () => {
        const errorMessage = this.vendaId
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
