import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Fornecedor} from "../../../models/fornecedor.model";
import {FornecedorService} from "../../../services/fornecedor.service";

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrl: './fornecedor-list.component.css'
})
export class FornecedorListComponent implements OnInit {
  fornecedores: Fornecedor[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.listar()
      .subscribe((fornecedores: Fornecedor []) => this.fornecedores = fornecedores);
  }

  onEdit(id: number) {
    this.router.navigate(['/fornecedor/editar', id]);
  }

  onRemove(id: number) {
  }
}
