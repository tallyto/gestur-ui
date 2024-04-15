import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
})
export class ProdutoFormComponent implements OnInit {
  public produtoForm: FormGroup;
  isCollapsed = false;
  produtoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.getProdutoFormBuilder();
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.produtoId = +id;
        this.loadProdutoData(this.produtoId);
      }
    });
  }

  getProdutoFormBuilder() {
    return this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: ['', Validators.required],
    });
  }

  loadProdutoData(id: number) {
    this.produtoService.getProdutoById(id).subscribe((produto) => {
      this.produtoForm.patchValue(produto);
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/produto']);
  }

  onSubmit() {
    if (this.produtoForm.invalid) {
      return;
    }
    const produto: Produto = this.produtoForm.value;
    const produtoObservable = this.produtoId
      ? this.produtoService.atualizarProduto(this.produtoId, produto)
      : this.produtoService.cadastrarProduto(produto);

    produtoObservable.subscribe({
      next: () => {
        const sucessoMessage = this.produtoId
          ? 'Produto atualizado com sucesso!'
          : 'Produto cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        this.produtoForm.reset();
        this.goBack();
      },
      error: () => {
        const errorMessage = this.produtoId
          ? 'Erro ao atualizar produto'
          : 'Erro ao cadastrar produto';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000,
        });
      },
    });
  }
}
