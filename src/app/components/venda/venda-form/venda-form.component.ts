import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../../../services/venda.service';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import {Venda} from "../../../models/venda.model";
import {FileUploadEvent} from "primeng/fileupload";
import {environment} from "../../../../environments/environment";
import {ItemAnexo} from "../../../models/item-anexo.model";

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
  servico = [{id: 1, nome: "Pacote"},{id: 2,  nome: "Aéreo"},{id: 3,  nome: "Hotel"},{id: 4,  nome: "Transfer"}]
  hasItems: false;
  attachmentColapsed: false;
  uploadUrl: string | undefined;

  uploadedFiles: any[] = [];

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
        this.uploadUrl = `${environment.apiUrl}/api/vendas/${id}/anexos`
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
      servico: ['', Validators.required],
      total:  {value: 0, disabled: true},
      itens: [],
    });
  }

  loadVendaData(id: number) {
    this.vendaService.buscarPorId(id).subscribe({
      next: (venda) => {
        this.vendaForm.patchValue(venda);
        this.uploadedFiles = []
        if (venda.anexos.length > 0) {
          this.uploadedFiles = venda.anexos.map((value: ItemAnexo)=> {
            return {
              id: value.anexo.id,
              name: value.anexo.nomeOriginal,
              size: value.anexo.tamanho,
            }
          })
        }
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

  onEdit(id: number) {
    this.router.navigate(['/venda/editar', id]);
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
      next: (venda) => {
        const sucessoMessage = this.vendaId
          ? 'Pedido atualizado com sucesso!'
          : 'Pedido cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        this.vendaForm.reset();
        this.onEdit(venda.id)
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
  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.loadVendaData(this.vendaId)
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }
  onDownload(anexoId: number) {
    this.vendaService.downloadAnexo(this.vendaId, anexoId).subscribe({
      next: (data) => {
        this.openNewTab(data.url);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err});
      }
    });
  }

  onRemove(anexoId: number) {
    this.vendaService.removeAnexo(this.vendaId, anexoId).subscribe({
      next: (_data) => {
        this.loadVendaData(this.vendaId)
      }
    })
  }
}
