import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestur-ui';

  constructor(private route: Router) { }

  showNavbar(){
    return this.route.url !== '/login' && this.route.url !== '/logout'
  }
}
