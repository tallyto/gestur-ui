import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {VendaService} from '../../../services/venda.service';
import {Cliente} from '../../../models/cliente.model';
import {ClienteService} from '../../../services/cliente.service';
import {Venda} from "../../../models/venda.model";
import {FileUploadEvent} from "primeng/fileupload";
import {environment} from "../../../../environments/environment";
import {ItemAnexo} from "../../../models/item-anexo.model";
import {Servico} from "../../../models/servico.model";
import {Status} from "../../../models/status.model";
import {ItemVenda} from "../../../models/item-venda.model";
import {FornecedorService} from "../../../services/fornecedor.service";
import {Fornecedor} from "../../../models/fornecedor.model";
import {markAllFieldsAsDirty} from "../../../utils/Util";

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
  servico = Servico
  status = Status
  hasItems: false;
  attachmentColapsed: false;
  uploadUrl: string | undefined;

  uploadedFiles: any[] = [];

  itemVendaModal = false;
  itemVendaFrom: FormGroup;
  fornecedores: Fornecedor[] = []

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private fornecedorService: FornecedorService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.vendaForm = this.getVendaFormBuilder();
    this.itemVendaFrom = this.getItemVendaFormBuilder();

    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.vendaId = +id;
        this.loadVendaData(this.vendaId);
        this.uploadUrl = `${environment.apiUrl}/api/vendas/${id}/anexos`
        this.loadFornecedorData()
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
      origem: [''],
      destino: [''],
      itens: [],
    });
  }

  getItemVendaFormBuilder(): FormGroup {
    return this.fb.group({
      id: [''],
      formaPagamento: ['', Validators.required],
      localizador: ['', Validators.required],
      fornecedor: ['', Validators.required],
      atendente: [''],
      anotacao: [''],
      descricao: [''],
      quantidade: [''],
      valorTotal: [0, Validators.required],
      desconto: [0],
      comissaoRecebida: [0],
      quantidadeFornecedor: [''],
      valorFornecedor: [0],
      descontoFornecedor: [0],
      comissaoAReceber: [0]
    })
  }


  loadVendaData(id: number) {
    this.vendaService.buscarPorId(id).subscribe({
      next: (venda) => {
        this.vendaForm.patchValue(venda);
        this.uploadedFiles = []
        if (venda.anexos.length > 0) {
          this.uploadedFiles = venda.anexos.map((value: ItemAnexo) => {
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

  loadFornecedorData() {
    this.fornecedorService.listar().subscribe({
      next: (fornecedores: Fornecedor[]) => {
        this.fornecedores = fornecedores
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
      markAllFieldsAsDirty(this.vendaForm)
      return;
    }
    const venda: Venda = this.vendaForm.value;
    const vendaObservable = this.vendaId
      ? this.vendaService.atualizar(this.vendaId, venda)
      : this.vendaService.cadastrar(venda);

    vendaObservable.subscribe({
      next: (venda) => {
        const sucessoMessage = this.vendaId
          ? 'Venda atualizada com sucesso!'
          : 'Venda cadastrada com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessoMessage,
          life: 3000,
        });
        // this.vendaForm.reset();
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
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
        this.loadVendaData(this.vendaId)
      }
    })
  }

  confirmRemoveAttachment(attachmentId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.onRemove(attachmentId)
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
      }
    });
  }

  handlerItemVendaModal() {
    this.itemVendaModal = !this.itemVendaModal;
  }

  handlerItemVenda() {
    if (this.itemVendaFrom.invalid) {
      markAllFieldsAsDirty(this.itemVendaFrom)
      return;
    }
    const itemVenda: ItemVenda = this.itemVendaFrom.value;
    this.vendaService.cadastrarItem(this.vendaId, itemVenda).subscribe({
      next: (itemVenda) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Item cadastrado com sucesso!',
          life: 3000,
        });
        this.handlerItemVendaModal()
        this.itemVendaFrom.reset()
        this.loadVendaData(this.vendaId)
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar item',
          life: 3000,
        });
      }
    })
  }

  onEditItemVenda(itemVenda: ItemVenda) {
    this.itemVendaFrom.patchValue(itemVenda)
    this.handlerItemVendaModal()
  }

  closeItemVendaModal() {
    this.handlerItemVendaModal()
    this.itemVendaFrom.reset()
  }
}
