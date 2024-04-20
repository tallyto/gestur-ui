import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model'; // Importe o modelo de Pedido correspondente
import { VendaService } from '../../../services/venda.service'; // Importe o serviço de Pedido correspondente
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: VendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoService.listar()
      .subscribe(pedidos => this.pedidos = pedidos);
  }

  onEdit(id: number) {
    this.router.navigate(['/pedido/editar', id]);
  }

  // Método para remoção de venda
  onRemove(id: number) {
    // Implemente a lógica de remoção de venda aqui
  }
}
