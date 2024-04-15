import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent  implements OnInit {


  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  onEdit(id: string) {
    console.log(id);
  }
  
  onRemove(id: string) {
    console.log(id);
  }

}