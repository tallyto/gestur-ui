import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendaService } from '../../../services/venda.service';
import { MessageService } from 'primeng/api';
import { Venda } from '../../../models/venda.model';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent implements OnInit {
  public vendaForm: FormGroup;
  isCollapsed = false; // Flag to control collapse state
  clientes: Cliente[] = [];
  vendaId: number | null = null; // ID da venda a ser editada

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private messageService: MessageService,
    private clienteService: ClienteService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.getVendaFormBuilder();
    this.loadClientes();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.vendaId = +id;
        this.loadVendaData(this.vendaId);
      }
    });
  }

  getVendaFormBuilder() {
    return this.fb.group({
      cliente: ['', Validators.required],
      valorPago: ['', Validators.required],
      valorRepassado: ['', Validators.required],
      formaPagamento: ['', Validators.required],
      valorComissaoRAV: ['', Validators.required],
      valorComissaoMarkup: ['', Validators.required],
      descontoAplicado: [false]
    });
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  loadVendaData(id: number) {
    this.vendaService.getVendaById(id).subscribe((venda) => {
      this.vendaForm.patchValue(venda);
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    if (this.vendaForm.invalid) {
      return;
    }

    const venda: Venda = this.vendaForm.value;
    const vendaObservable = this.vendaId ?
      this.vendaService.atualizarVenda(this.vendaId, venda) :
      this.vendaService.registrarVenda(venda);

    vendaObservable.subscribe({
      next: (value) => {
        const successMessage = this.vendaId ? 'Venda atualizada com sucesso!' : 'Venda registrada com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: successMessage,
          life: 3000
        });
        this.vendaForm.reset();
      },
      error: (err) => {
        const errorMessage = this.vendaId ? 'Erro ao atualizar venda' : 'Erro ao registrar venda';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000
        });
      },
    });
  }
}
