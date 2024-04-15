import { Component, OnInit } from '@angular/core';
import { Venda } from "../../../models/venda.model";
import { VendaService } from "../../../services/venda.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(
    private vendaService: VendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vendaService.getVendas()
      .subscribe(vendas => this.vendas = vendas);
  }

  onEdit(id: number) {
    console.log("clicado")
    // Navegar para o formulário de venda com o ID da venda a ser editada
    this.router.navigate(['/vendas/editar', id]);
  }

  onRemove(id: number) {
    console.log(id);
    // Implemente a lógica de remoção da venda aqui
  }
}
