import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="form-container">
      <h2>Registro</h2>

      <form (ngSubmit)="registrar()">
        <input
          type="text"
          placeholder="Nombre"
          [(ngModel)]="nombre"
          name="nombre"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
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
          {{ loading ? 'Registrando...' : 'Registrar' }}
        </button>
      </form>

      <p *ngIf="errorMsg" class="error-text">{{ errorMsg }}</p>
      <p *ngIf="successMsg" class="success-text">{{ successMsg }}</p>

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
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error-text {
      color: red;
      margin-top: 10px;
    }
    .success-text {
      color: green;
      margin-top: 10px;
    }
  `],
})
export class RegistroComponent {
  nombre = '';
  correo = '';
  contrasena = '';

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar() {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;

    // Rol por defecto: ASISTENTE (id=3 según tu seed)
    const payload = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      rol: { idRol: 3 },
    };

    this.usuarioService.crearUsuario(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Usuario creado correctamente. Ahora puedes iniciar sesión.';
        // opcional: redirigir automáticamente luego de 1 segundo
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (err) => {
        this.loading = false;
        // tu backend lanza IllegalArgumentException si correo duplicado
        this.errorMsg =
          err?.error?.message ||
          'No se pudo registrar. Verifica los datos e intenta nuevamente.';
      },
    });
  }
}
