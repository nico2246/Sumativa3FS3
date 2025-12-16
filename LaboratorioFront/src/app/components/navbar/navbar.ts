import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    // Aquí luego podrás eliminar token, limpiar sesión, etc.
    console.log("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
