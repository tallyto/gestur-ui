import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Venda} from "../../../models/venda.model";
import {VendaService} from "../../../services/venda.service";
import {Servico, ServicoType} from "../../../models/servico.model";

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(
    private pedidoService: VendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoService.listar()
      .subscribe(pedidos => this.vendas = pedidos);
  }

  onEdit(id: number) {
    this.router.navigate(['/venda/editar', id]);
  }

  getServiceName(value: ServicoType): string {
    const service = Servico.find(s => s.valor === value);
    return service ? service.nome : 'Serviço Desconhecido';
  }

  onRemove(id: number) {
  }
}
