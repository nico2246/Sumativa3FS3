import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="form-container">
      <h2>Registro</h2>
      <form (ngSubmit)="registrar()">
        <input type="text" placeholder="Nombre de usuario" [(ngModel)]="usuario" name="usuario" required />
        <input type="email" placeholder="Correo electrónico" [(ngModel)]="email" name="email" required />
        <input type="password" placeholder="Contraseña" [(ngModel)]="password" name="password" required />
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes cuenta? <a routerLink="/login">Ingresa</a></p>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
    }
    input {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #218838;
    }
  `]
})
export class RegistroComponent {
  usuario = '';
  email = '';
  password = '';

  registrar() {
    console.log('Registro:', this.usuario, this.email, this.password);
    // Aquí luego se conectará con el backend
  }
}
