import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {FornecedorService} from "../../../services/fornecedor.service";
import {Fornecedor} from "../../../models/fornecedor.model";

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent implements OnInit {

  public fornecedorForm: FormGroup;
  isCollapsed = false;
  fornecedorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fornecedorForm = this.getFornecedorFormBuilder();

    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.fornecedorId = +id;
        this.loadData(this.fornecedorId);
      }
    });
  }

  getFornecedorFormBuilder(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
    });
  }

  loadData(id: number) {
    this.fornecedorService.buscarPorId(id).subscribe({
      next: (venda) => {
        this.fornecedorForm.patchValue(venda);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar fornecedor',
          life: 3000,
        });
      }
    })
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/fornecedor']);
  }

  onSubmit() {
    if (this.fornecedorForm.invalid) {
      return;
    }
    const fornecedor: Fornecedor = this.fornecedorForm.value;
    const vendaObservable = this.fornecedorId
      ? this.fornecedorService.atualizar(this.fornecedorId, fornecedor)
      : this.fornecedorService.cadastrar(fornecedor);

    vendaObservable.subscribe({
      next: () => {
        const sucessoMessage = this.fornecedorId
          ? 'Fornecedor atualizado com sucesso!'
          : 'Fornecedor cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        this.fornecedorForm.reset();
        this.goBack();
      },
      error: () => {
        const errorMessage = this.fornecedorId
          ? 'Erro ao atualizar fornecedor'
          : 'Erro ao cadastrar fornecedor';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000,
        });
      },
    });
  }
}
