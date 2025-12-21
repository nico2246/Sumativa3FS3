import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="form-container">
      <h2>Login</h2>

      <form (ngSubmit)="login()">
        <input
          type="email"
          placeholder="Correo"
          [(ngModel)]="correo"
          name="correo"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          [(ngModel)]="contrasena"
          name="contrasena"
          required
        />

        <button type="submit" [disabled]="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>

      <p *ngIf="errorMsg" class="error-text">{{ errorMsg }}</p>

      <p>¿No tienes cuenta? <a routerLink="/register">Regístrate</a></p>

      <p class="mt-2">
  <a routerLink="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
</p>
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
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error-text {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  errorMsg = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.errorMsg = '';

  this.authService.login({
    correo: this.correo,
    contrasena: this.contrasena
  }).subscribe({
    next: (ok) => {
      if (ok) {
        this.router.navigate(['/home']);
      } else {
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    },
    error: () => {
      this.errorMsg = 'Error al conectar con el servidor';
    }
  });
}

}
