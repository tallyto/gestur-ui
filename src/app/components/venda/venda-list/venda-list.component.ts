import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Venda} from "../../../models/venda.model";
import {VendaService} from "../../../services/venda.service";

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

  onRemove(id: number) {
  }
}
