import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  items: MenuItem[];

  constructor() {
    this.items = [];
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: "/cliente/new"
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-users',
            routerLink: "/cliente/list"
          }
        ],
      },
      {
        label: 'Pedidos',
        icon: 'fa-solid fa-dollar-sign',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: "/pedido/new"
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-users',
            routerLink: "/pedido/list"
          }
        ],
      },
      {
        label: 'Produtos',
        icon: 'fa-solid fa-suitcase',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/produto/new"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/produto/list"
          }
        ]
      },
      {
        label: 'Lembretes',
        
        icon: 'fa-regular fa-calendar-days',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/cadastro-carteirinha"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/lista-carteirinha"
          }
        ]
      },
      {
        label: 'Roteiros',
        icon: 'fa-solid fa-route',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/cadastro-carteirinha"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/lista-carteirinha"
          }
        ]
      },
      {
        label: 'Embarques',
        icon: 'fa-solid fa-plane',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/cadastro-carteirinha"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/lista-carteirinha"
          }
        ]
      },
      {
        label: 'Hospedagem',
        icon: 'fa-solid fa-hotel',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/cadastro-carteirinha"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/lista-carteirinha"
          }
        ]
      }
    ]
  }
}
