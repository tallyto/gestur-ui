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
        label: 'Venda',
        icon: 'fa-solid fa-dollar-sign',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: "/venda/new"
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-users',
            routerLink: "/venda/list"
          }
        ],
      },
      {
        label: 'Fornecedores',
        icon: 'fa-solid fa-briefcase',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-save',
            routerLink: "/fornecedor/new"
          },
          {
            label: 'List',
            icon: 'fa-solid fa-list',
            routerLink: "/fornecedor/list"
          }
        ]
      },
      {
        label: 'Lembretes',

        icon: 'fa-regular fa-calendar-days',
        items: [
          {
            label: 'Aniversários',
            icon: 'fa-solid fa-cake-candles',
            routerLink: "/aniversarios"
          },
          {
            label: 'Embarques',
            icon: 'fa-solid fa-plane',
            routerLink: "/embarques"
          },
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
      }
    ]
  }
}
