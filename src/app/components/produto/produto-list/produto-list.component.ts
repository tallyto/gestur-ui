import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../models/produto.model'; // Importe o modelo de Produto correspondente
import { ProdutoService } from '../../../services/produto.service'; // Importe o serviço de Produto correspondente
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  onEdit(id: number) {
    this.router.navigate(['/produto/editar', id]);
  }

  // Método para remoção de produto
  onRemove(id: number) {
    // Implemente a lógica de remoção de produto aqui
  }
}
