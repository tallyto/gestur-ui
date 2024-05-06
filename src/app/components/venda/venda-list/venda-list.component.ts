import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Venda} from "../../../models/venda.model";
import {VendaService} from "../../../services/venda.service";
import {Servico, ServicoType} from "../../../models/servico.model";
import {Status, StatusType} from "../../../models/status.model";

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

  getServiceName(value: ServicoType): string {
    const service = Servico.find(s => s.valor === value);
    return service ? service.nome : 'Serviço Desconhecido';
  }

  getStatusName(value: StatusType): string {
    const status = Status.find(s => s.valor === value);
    return status ? status.nome : 'Status Desconhecido';
  }


  onRemove(id: number) {
  }

  getStatusSeverity(status: StatusType) {
   switch (status) {
     case StatusType.COTACAO:
     case StatusType.EM_ANDAMENTO:
     case StatusType.POS_VENDA:
       return 'info'
     case StatusType.FINALIZADO:
       return  'success'
     case StatusType.CANCELADO:
       return 'danger'
     case StatusType.PENDENTE:
       return 'warning'
     default:
       return 'warning'
   }
  }
}
