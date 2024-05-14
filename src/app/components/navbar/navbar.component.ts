import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];


  constructor(private authService: AuthService) {
    this.items = [];
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'fa-solid fa-users',
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
      },
      {
        label: 'Perfil',
        icon: 'fa-solid fa-user',
        items: [
          {
            label: 'Configuração',
            icon: 'fa-solid fa-gear',
            routerLink: "/config"
          },
          {
            label: 'Sair',
            icon: 'fa-solid fa-xmark',
            // routerLink: "/logout"
            command: () => {
              this.authService.logout()
            }
          }
        ],
      },
    ]
  }
}
