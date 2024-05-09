import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Cliente} from '../../../models/cliente.model';
import {ClienteService} from '../../../services/cliente.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {FileUploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {


  public clienteForm: FormGroup;
  isCollapsed = false;
  clienteId: number | null = null;
  doccumentColapsed = false;
  attachmentColapsed: false;
  uploadedFiles: any[] = [];

  uploadUrl = ''
  addressCollapsed = true
  othersCollapsed = true;

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.clienteForm = this.getClientFormBuilder()
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.clienteId = +id;
        this.loadClienteData(this.clienteId);
        this.uploadUrl = `${environment.apiUrl}/api/clientes/${this.clienteId}/anexos`
      }
    })
  }


  getClientFormBuilder() {
    return this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      renda: [''],
      profissao: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      numeroPassaporte: [''],
      paisEmissao: [''],
      dataEmissao: [''],
      dataValidade: [''],
    });
  }


  loadClienteData(id: number) {
    this.clienteService.getClienteById(id).subscribe((cliente) => {
        this.clienteForm.patchValue(cliente);
        this.uploadedFiles = []
        if (cliente.anexos.length > 0) {
          this.uploadedFiles = cliente.anexos.map(value => {
            return {
              id: value.anexo.id,
              name: value.anexo.nomeOriginal,
              size: value.anexo.tamanho,
            }
          })
        }
      }
    );
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/cliente']);
  }

  onSubmit() {
    if (this.clienteForm.invalid) {
      return;
    }
    const cliente: Cliente = this.clienteForm.value;
    const clienteObservable = this.clienteId ? this.clienteService.atualizarCliente(this.clienteId, cliente) : this.clienteService.cadastrarCliente(cliente);

    clienteObservable.subscribe({
      next: (cliente) => {
        const sucessMessage = this.clienteId ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!';
        this.messageService.add({
          severity: 'success',
          summary: sucessMessage,
          life: 3000
        });
        this.onEdit(cliente.id);
      },
      error: (_err) => {
        const errorMessage = this.clienteId ? 'Erro ao atualizar cliente' : 'Erro ao cadastrar cliente';
        this.messageService.add({
          severity: 'error',
          summary: errorMessage,
          life: 3000
        });
      }
    })

  }


  buscarEnderecoPorCep() {
    const cep = this.clienteForm.get('cep')?.value;

    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (data) => {
          // @ts-expect-error
          if (!data.erro) {
            this.clienteForm.patchValue({
              rua: data['logradouro'],
              bairro: data['bairro'],
              cidade: data['localidade'],
              estado: data['uf'],
            })
          }
        }
      })
    }
  }


  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.loadClienteData(this.clienteId)
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }

  onDownload(anexoId: number) {
    this.clienteService.downloadAnexo(this.clienteId, anexoId).subscribe({
      next: (data) => {
        this.openNewTab(data.url);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err});
      }
    });
  }

  onRemove(anexoId: number) {
    this.clienteService.removeAnexo(this.clienteId, anexoId).subscribe({
      next: (_data) => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
        this.loadClienteData(this.clienteId)
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

  onEdit(id: number) {
    this.router.navigate(['/cliente/editar', id]);
  }


}
